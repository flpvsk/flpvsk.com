import { makeBlogPost } from '~/layouts/BlogPostLayout';
import Details from '~/shared/Details';
import DemoCrud from '~/shared/DemoCrud';
import DemoEventSourcing from '~/shared/DemoEventSourcing';

export const meta = {
  title: `Building offline-first web and mobile apps using event-sourcing`,
  heading: `Building offline-first web and mobile apps using event-sourcing`,
  publishDate: '2019-07-30',
  author: 'Andrey Salomatin',
  image: null,
  description: ``,
};

export default makeBlogPost(meta);

Today [CRUD][crud] is *the default* paradigm for managing
data in a user-facing app. It works fine if the user's device has
a stable internet connection, but makes the app unusable in the case of
absent or poor connection. Even when online using CRUD eventually leads to loss of data and ordering issues due to the concurrent nature of network communication.

In this post I'll share how I use event-sourcing to overcome limitations
of CRUD and some of the new problems that come with this approach.

## Problem

When we use CRUD, we basically tether our frontend application to the
server. The server's database becomes the ultimate source of truth. The
app becomes a view of the server's database. Keeping that view up to date
is hard. Adding layers of caching and processing in between the interface
and the database makes it even harder.

Here's a quick demo, let's say we have a single number, that we want to
synchronize between 3 instances of the app:

* App on the user's laptop;
* App on the user's smartphone;
* Database.

Let's say each instance loads the value from the database on app start. To
make user experience better, each app updates the UI as soon as the user
clicks on a button and makes the update call to the database immediatly
after. To simulate network conditions, we'll add a delay to
app-to-database communication.

<DemoCrud header='Fixed delay' />

Try clicking on the User's buttons and "Reload all" and you'll notice how
unpredictable the final state of the system can be. One of the users might
see a value that is different from the one in the database and on the
other user's screen.

Let's bring the system even closer to real conditions and randomize the
time it takes for an update to reach the database:

<DemoCrud
  header='Random delay'
  hasRandomDelay
/>

Any process within that system can be in any of the two states
*independently* of all other processes.

Things get even worse if we add offline/poor connection to the picture. Do we allow users to edit the value while offline?

* If yes, how do we sync that value to the database once the device is back online? How do we know that the value wasn't changed during the "offline time";
* If no, how do we detect if the device is truly offline? It's possible that we have got no or very slow internet, even if the sensors on device tell us we're connected.


## Workarounds

There are tricks we could employ to improve the situation, without getting
rid of CRUD. For example:

* Poll data from the server at regular intervals to make sure UI is up to date with the database;
* Restrict offline edits, using regular ping-style checks to the API host to determine wheather we're offline;
* Use a versioning system similar to the one in [CouchDB][couchdb]. Only allow those updates that have the up-to-date version number of the object attached.

These tricks might make the system a bit more reliable, but never
unbreakable. In addition, those practices *definitely worsen* user
experience.

## Local-first

A better way is to untether the app from the server. The app needs to be able to:

* The app should work when online, offline or on a slow or unreliable connection;
* It should be complete and non-restrictive when offline;
* Once two instances of the app had a chance to exchange messages (via a server or directly), they need to be able to come to the same "truth", to converge to the same value;

To do that we need to move the app logic to the client. Make the app
behave more like Winamp less like Soundcloud.

In the client-server model the server is the ultimate authority and hence
the ultimate bottleneck. We need to move towards a *peer-to-peer* or
*local-first* model.


### Three comrades

Before we dive into event-sourcing, I'd like to give a real-world
example that could help us understand how it works. First time I've heard
that example was from someone from [Scuttlebutt][scuttlebutt] community
and it's been very helpful to me.

Say there are three friends: Ginny, Harry and Ron. They know each other
pretty well, but they've been busy lately and haven't seen or heard from
each other for a couple of months.

Imagine now that Ron meets Ginny and they catch up. Now Ron knows that
Ginny has passed her exams successfully and Ginny knows that Ron's rat
dissappeared. Both of those facts are unknown to Harry.

Some time later Ginny meets Harry. The CRUD approach to get Harry up to
speed would be for Ginny to describe who Ron is in every detail including
the fact that *Ron doesn't have a rat*. Outside of it being weird to
mention that last point, it would be a very inefficient way to
tell Harry what's been going on with his friend.

It would probably go a bit different though. Ginny would ask Harry when
was the last time he'd heard of Ron and then describe him events that
happened to his friend after that moment.

Their communication would be similar to how event-sourcing works.


## Event-sourcing

In the event-sourcing model each instance of the app has its own
append-only log of events. Events are atomic updates that correspond to
user actions in the app. Those logs of events is what gets synchronized between all the instances of the app, including the server.

So, let's say we have a user profile object that looks like this:

```js
// User profile object shape

{
  id: "user-profile-a1",
  firstName: "Andrei",
  lastName: "Salomatin
}
```

Instead working directly with this object, whenever we want to read or
udpate it, we would work with events that later will be reduced to become
that object.

This is similar to how in banking software we don't write code that
manipulates the balance of client's account directly. Instead, we add
transactions to an append-only log and calculate the balance based on that
log.

```js
// User profile events

[
  {
    originEventId: "update-profile-1",
    eventType: "setFirstName",
    objectId: "user-profile-a1",
    data: {
      firstName: "Andrey"
    }
  },
  {
    originEventId: "update-profile-2",
    eventType: "setLastName",
    objectId: "user-profile-a1",
    data: {
      lastName: "Salomatin"
    }
  }
]
```

Events are atomic, that means that we never need to update an event once
it's created. Upon creation events get assigned a globally unique locally
monotonically increasing identifier `originEventId`. How to generate these
ids is a big subject in itself, I'll talk about it more later in the
article.

Because `originEventId` is monotonically increasing, we can sort events
before reducing if our reducer is order-dependant:

```js
function userProfileReducer(state, event) {
  return {
    ...state,
    id: event.objectId,
    ...event.data
  };
}

const userProfile = events
  .sort(byOriginEventId)
  .reduce(userProfileReducer, {});
```

### Synchronizing events

I'll call an instance of the app **a replica.**  It could be a
user's device or a server.

Each replica has its *append-only* log of events. Another way to think
about it is that each replica records all the events in order it observes
them.

Whenever a replica creates a new event, it generates a unique monotonically
increasing identifier and assigns it to *two fields*: `localEventId` and
`originEventId`.

* `localEventId` is an indicator of the order in which a replica has observed an event, it changes from replica to replica;
* `originEventId` is the actual id of the event, it stays the same across replicas.

<DemoEventSourcing header='Conflict detection' />

Whenever a replica observes an event created by someone else, it overrides
its `localEventId` before adding it to its log.  That way we know the
relative order of events on any replica. `originEventId` always stays the
same.

Only the origin replica (the replica that created the event) would have
`localEventId` and `originEventId` set to the same identifier.

Because every event has a unique `originEventId`, it makes it easy to
synchronize events across devices. In case of a poor connection we can
retry sending events without the risk of applying the same update several
times.

We use `localEventId`s to retreive only those events that we haven't seen
yet.

Example 1: `ReplicaA` hasn't received any events from `ReplicaB`, it will
query all events and add them to its log.

Example 2: `ReplicaA` has received some events from `ReplicaB`, with the
last `localEventId (on ReplicaB) === 'event-5'`. `ReplicaA` can now query
events that `ReplicaB` *observed after* `event-5`.


### Storing events

We can store events in any SQL/NoSQL storage. In the web browser
[IndexedDB][indexeddb] fits perfectly, on a mobile device [SQLite](sqlite)
does the job.

[crud]: https://en.wikipedia.org/wiki/Create%2C_read%2C_update_and_delete
[rest]: https://todo
[couchdb]: https://todo
[indexeddb]: https://todo
[sqlite]: https://todo
[scuttlebutt]: https://todo
