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


<!--
> All problems in computer science can be solved by another level of
> indirection... Except for the problem of too many layers of indirection.
>
> – [David Wheeler](https://en.wikipedia.org/wiki/David_Wheeler_%28computer_scientist%29)
-->


[code-ui-ep]:https://codepodcast.com
