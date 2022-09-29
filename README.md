# rehype-color-chips

[rehype] plugin to add a color chip with an inline code block containing a [supported color model].

These don't work with `.md` files, but work inside issues. See https://github.com/shreshthmohan/rehype-color-chips/issues/1#issue-1391093265

On GitHub issues:

![image](https://user-images.githubusercontent.com/5955802/193078505-12afcdd8-446d-499d-910f-b2bf46a13105.png)

On a page with this plugin:

![image](https://user-images.githubusercontent.com/5955802/193078786-df6e4d08-7d7f-41e8-89d1-661691e73a7c.png)

Note that the 3-digit hex code doesn't work on GitHub, but works with this plugin.

Appropriate [styles](#styling) will need to be applied for the the color "chip" to show up.

## Installation

```
npm install rehype-color-chips
```

```
yarn add  rehype-color-chips
```

## Usage

This plugin has been tested to work with [next-mdx-remote]. But should work with other mdx libraries too.

[See it being used in a Next.js project here.]

```js
import { serialize } from 'next-mdx-remote/serialize'
import rehypeColorChips from 'rehype-color-chips'

const serializedContent = await serialize(content, {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      /* other rehype plugins */
      [rehypeColorChips, { customClassName: 'color-chip' }],
    ],
  },
})
```

## Styling

By default, the plugin applies a `gfm-color-chip` class to the added element.

As an example the following styles can be applied to the color chip:

```css
.gfm-color-chip
  margin-left: 0.125rem;
  display: inline-block;
  height: 0.625rem;
  width: 0.625rem;
  border-radius: 9999px;
  border: 1px solid gray;
```

You can change the class name by providing a custom value for the class attribute. Provide [`customClassName`](#options.customClassName) via options

## API

`rehype().use(rehypeColorChips, [options])`

Adds a `<span>` tag with the color as `background-color` in the `style` attribute.

### options

#### options.customClassName

Type: `string`
Default: `'gfm-color-chip'`

Adds a `class` to the added span element. Can be used to apply custom [styles](#styling) to the "color-chip".

[rehype]: https://github.com/wooorm/rehype
[supported color model]: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#supported-color-models
[next-mdx-remote]: https://github.com/hashicorp/next-mdx-remote
[see it being used in a next.js project here.]: https://github.com/shreshthmohan/next-blog/blob/e7e29b70b40937593b4501ea5e495b01384b5235/utils/fetchIssues.ts#L83
