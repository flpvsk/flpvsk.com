import { makeBlogPost } from '~/layouts/BlogPostLayout';

export const meta = {
  title: `A pixel is not a pixel`,
  publishDate: '2019-03-08',
  author: 'Andrey Salomatin',
  description:
    `When adding layers of abstraction does more harm than good`,
};

export default makeBlogPost(meta);

Building graphical user interfaces always seemed unnecessarily hard to me.
So much so I even made a [podcast episode][code-ui-ep] about that topic.

One of the reasons why seems to be common across different kinds of
systems. It's not GUI-specific. That reason is poor API design.
Specifically poor balance of *control* vs *ease-of-use* over the space
of use cases.

## The lost art of geometry

Here's a puzzle. Let's say we have two rectangles. One is taller and wider
than the other. We want to place and vertically center the smaller
rectangle inside the larger one.

The height of the larger rectangle is `h1`. The height of the smaller one
is `h2`. How do we solve for `x`, where `x` is the vertical offset of one
rectangle against the other?

![Puzzle: center a rectangle][img-ex1]

In case you'd like to take a shot at it, here're a few options:

```
1. x = h1 / 2
2. x = (h1 - h2) / 2
3. x = (h1 + h2) / 2
```

<details>
<summary>See the answer</summary>

The answer is:

```
2. x = (h1 - h2) / 2
```

</details>

You see, it's only one line of Math -- that old unsexy programming language
of spreadsheets.

If we transfer this problem from the world of forms into the world of HTML
documents, it's still solvable. With CSS -- that new cool styling language
of browsers.

```
.container {
  display: flex;
  align-items: center;
}
```


### A slightly harder puzzle

Let's make it a titbit harder. Now we'd like to tie the upper side of the
smaller rectangle to a grid. The rest is the same. We are still centering
the smaller box within a larger one, only this time rounding the value of
`x` to the closest grid row.

The height of a grid row is `h3`.

![Puzzle: center a rectangle within a grid][img-ex2]

Here are the options:

```
1. x = h3 * round((h1 - h2) / (2 * h3))
2. x = h3 * (h1 - h2) / 2
3. x = h3 * floor((h1 + h2) / 2)
```

<details>
<summary>See the answer</summary>

The answer is:

```
1. x = h3 * round((h1 - h2) / (2 * h3))
```

</details>

This time the solution is more complicated, but it's still Math and it's
still just one line.

How would we do this with CSS? With iOS AutoLayout? Android Layout?

Sadly, there's no way.

### Who's got the rhythm?

Those puzzles were inspired by real-world use cases for GUIs. The last
one is a model of [vertical rhythm,][vert-rhythm] a concept from
typography.

![Vertical rhythm][img-vert-rhythm]

Why is it so hard to implement? After all we're just arranging pixels on
the screen. Pixels are squares. Squares are geometric shapes that we
should be able to manipulate with ease. But we can't.

### A pixel is not a pixel

The problem is that a pixel on the screen is represented by something else
in the code. It's a DOM element, a View, an Object. It's a thousand
different things. What a pixel *actually is* is hidden from a developer.

![Browser's render pipeline][img-render-pipeline]

In case of a browser it leads to all sorts of inconveniences:

* We are limited to the use cases that browser vendors consider
  common;
* We can't write tests for layout or paint stages of rendering;
* Testing anything UI-related requires *spinning off a browser.* It's like
  going groceries shopping on a private jet.

<!--
> All problems in computer science can be solved by another level of
> indirection... Except for the problem of too many layers of indirection.
>
> – [David Wheeler](https://en.wikipedia.org/wiki/David_Wheeler_%28computer_scientist%29)
-->

## A reasonable explanation


[code-ui-ep]:https://todo
[vert-rhythm]:https://todo

[img-ex1]:/static/blog/pixel/ex1.tiff
[img-ex2]:/static/blog/pixel/ex2.tiff
[img-vert-rhythm]:/static/blog/pixel/vertical-rhythm.png
[img-render-pipeline]:/static/blog/pixel/render-pipeline.png
