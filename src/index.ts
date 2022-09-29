import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'
import { color } from 'd3-color'
import type { Root } from 'hast'

interface Options {
  customClassName: string
}

function plugin(options: Options = { customClassName: 'gfm-color-chip' }) {
  return (tree: Root) => {
    visit(tree, 'element', function (node) {
      if (node.tagName === 'code' && node.properties) {
        const value = toString(node)
        if (color(value)) {
          node.children.push({
            type: 'element',
            tagName: 'span',
            properties: {
              className: [options.customClassName],
              style: 'background-color: ' + color(value)?.formatHex() + ';',
            },
            children: [],
          })
        }
      }
    })
  }
}

export default plugin
