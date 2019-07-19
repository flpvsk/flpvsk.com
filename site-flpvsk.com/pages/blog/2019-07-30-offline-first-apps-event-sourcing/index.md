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

## The problem

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


### Workarounds

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

Events must contain all the necessary data for us to later be able to
reconstruct the object. They also can contain additional info. For example
for audit purposes each event might have a `userId` and a `timestamp` set.

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

<DemoEventSourcing header='Conflict detection w/ event-sourcing' />

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

> It's not easy to explain the sync process with just text and pictures,
> so please do play around with the demo above.
>
> The demo shows how we can detect conflicts: one replica changing its
> number to `ValueA` before receiving an update with a different value,
> `ValueB`, from another replica.

### Reducers

Capturing and syncing events across replicas was the hard part, but it's
not very useful in itself. How can we show actual values to the user?

I've already mentioned reducers – functions that can help us transform a
list of events into a value-object. Here's how a simple
last-write-wins reducer might look like:

```js
// Last-write-wins reducer

function reducer(state = initialState, event) {
  if (state.version > event.originEventId) {
    return state;
  }

  return {
    ...state,
    version: event.originEventId,
    value: event.data.value,
  };
}
```

If we want to do something more complex, like conflict detection, the
reducer will look slightly different:


```js
// Conflict-detecting reducer, simplified

function reducer(state = initialState, event) {
  if (state.version > event.originEventId) {
    return {
      ...state,
      hasConflict: true,
      conflictingValues: (
        state.conflictingValues.concat([
          event.data.value
        ])
      ),
    };
  }

  return {
    ...state,
    hasConflict: false,
    version: event.originEventId,
    value: event.data.value,
  };
}
```

What's great is that we can swap the reducer as the app and the business
requirements change. As long as events contain all the necessary metadata
for the new reducer to work – we can painlessly fit it in.

At the same time, if the reducers are pure functions with no side-effects,
we can reuse them across the backend / frontend divide.

Here's an example of the app with several different reducers:

<DemoEventSourcing
  header='Using different reducers on the same data'
  showReducers={true}
/>

### Snapshots

We can now reduce events and get the actual value, how do we filter and
query data that is scattered across hundreds of tiny events?

This is where snapshots come in. Snapshot is a versioned value-object
saved in an indexable storage. Here's how to generate a snapshot from
scratch:

1. List all the local events related to an object using `objectId`;
2. Run those events through the reducer to get the value-object;
3. The most recent (largest) `localEventId` among those events is the `version` of the snapshot;
4. Save the snapshot alongside its version in an indexable storage.

Now let's say the app receives new events related to an object that
already has an older snapshot. In this case:

1. Get the most recent snapshot of the object by its `objectId`;
2. List all the local events related to that object starting from the `localEventId` equal to the `version` of the most recent snapshot;
3. Run those events through the reducer using the snapshot as the initial state;
4. The most recent (largest) `localEventId` among those events is the `version` of the snapshot;
5. Save the snapshot alongside its version in an indexable storage.

Snapshots are expandable, we can delete and recreated them whenever we
need. The typical usecase for Snapshots is feeding list views, tables and
search in the app.

We can store snapshots on every replica, depending on the experience we
want to achieve. For example if we want to let users be able to search
through their social media feed offline, we'd have to store a significant
amount of snapshot data locally. If that's not required, we can use the
server for such queries. Third option is to do something in between – my
apps typically store snapshots of at least 1 page worth of content
locally and load everything else from the server if required.


### Storage

We can store both events and snapshots in any SQL/NoSQL storage on both
frontend and backend, browser and mobile.

Events table (or collection) contains all the events for all the objects
in the system that use event-sourcing. Events storage would normally have
unique indexes on `localEventId`, `originEventId` and `objectId` fields.

Snapshots storage would have an index on `[ objectId, version ]` pair and
any other fields we want to query or search. For example a `User` object
might have a full-text index on the `fullName` field.

In the web browser IndexedDB fits perfectly, on a mobile device SQLite
does the job. I've had some experience with MongoDB, MSSql Server, MySQL.
All work fine.

When using SQL storage I tend to store indexable fields in separate
columns and the rest of the data as a JSON string in a column named
`rawData` or somesuch.

The only tricky part is finding out how can we index `*EventId` fields so
that we can query events in order. That depends on the clock
implementation you choose. More on this later.

### Transport

We can use HTTP(S) to sync events and snapshots via a [REST][rest] or a
[GraphQL][graphql] API, it's no different from how we'd normally build a
server.

Making real-time apps is easy with event-sourcing too. We can use
[Websocket][websocket] to send events to all subscribed replicas.

If we are on a mobile or a desktop device we can bypass the server
completely and sync devices directly using [libp2p][libp2p] or [dat][dat].
The approach would be *exactly the same*. It could work in a web-browser
too through [WebRTC][webrtc] although not without quirks and problems
intrinsic to that protocol.

We can combine approaches. Normally in an app I would use both REST or
GraphQL and a Websocket. For example REST for sending events to the
server, querying snapshots and receiving initial event log for an object,
Websocket for receiving updates related to that object in real-time.

The beauty of event-sourcing is it doesn't depend on the transport you
choose. Use whatever works for your app. The sync code will be the same.


[crud]: https://en.wikipedia.org/wiki/Create%2C_read%2C_update_and_delete
[rest]: https://todo
[couchdb]: https://todo
[indexeddb]: https://todo
[sqlite]: https://todo
[scuttlebutt]: https://todo
[graphql]: https://todo
[websocket]: https://todo
[rest]: https://todo
[webrtc]: https://todo
[libp2p]: https://todo
[dat]: https://todo
