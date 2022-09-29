# rehype-color-chips

[rehype] plugin to add a color chip with an inline code block containing a [supported color model].

Some examples: `#fa3467` `#ef3` `rgb(24, 213, 78)` `hsl(0, 100%, 50%)` These don't work with `.md` files, but works in side issues. See https://github.com/shreshthmohan/rehype-color-chips/issues/1#issue-1391093265

On GitHub issues:

![image](https://user-images.githubusercontent.com/5955802/193078505-12afcdd8-446d-499d-910f-b2bf46a13105.png)

On a page with this plugin:

![image](https://user-images.githubusercontent.com/5955802/193078786-df6e4d08-7d7f-41e8-89d1-661691e73a7c.png)

Note that the 3-digit hex code doesn't work on GitHub, but works with this plugin.

Works with [next-mdx-remote].

Appropriate [styles](#styling) will need to be applied for the the color "chip" to show up.

## Installation

## Styling

[rehype]: https://github.com/wooorm/rehype
[supported color model]: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#supported-color-models
[next-mdx-remote]: https://github.com/hashicorp/next-mdx-remote
