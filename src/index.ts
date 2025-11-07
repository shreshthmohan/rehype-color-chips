import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'
import { color } from 'd3-color'
import type { Root } from 'hast'

interface Options {
  customClassName: string
  location: Location
}

type Location = "after" | "before"

function plugin(options: Options = { customClassName: 'gfm-color-chip', location: 'after' }) {
  return (tree: Root) => {
    const customClassName = options.customClassName ?? 'gfm-color-chip'
    const location = options.location ?? 'after'
    const nodesToModify: Array<{ node: any; index: number; parent: any; colorValue: string }> = []

    visit(tree, 'element', function (node, index, parent) {
      if (node.tagName === 'code' && node.properties) {
        const value = toString(node)
        const parsedColor = color(value)
        if (parsedColor && parent && typeof index === 'number') {
          nodesToModify.push({ node, index, parent, colorValue: parsedColor.formatHex() })
        }
      }
    })

    for (let i = nodesToModify.length - 1; i >= 0; i--) {
      const { node, index, parent, colorValue } = nodesToModify[i]
      const newNode = {
        type: 'element' as const,
        tagName: 'span',
        properties: {
          className: [customClassName],
          style: 'background-color: ' + colorValue + ';',
        },
        children: [],
      }

      if (location === 'before') {
        parent.children.splice(index, 0, newNode)
      } else {
        node.children.push(newNode)
        if (location !== 'after') {
          console.log('location is not before or after, defaulting to after', location)
        }
      }
    }
  }
}

export default plugin
