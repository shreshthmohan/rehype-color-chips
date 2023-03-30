'use strict';
const { visit } = require('unist-util-visit');
const { toString } = require('hast-util-to-string');
const { color } = require('d3-color');
function plugin(options) {
    if (options === void 0) { options = { customClassName: 'gfm-color-chip' }; }
    return function (tree) {
        visit(tree, 'element', function (node) {
            if (node.tagName === 'code' && node.properties) {
                var value = toString(node);
                var parsedColor = color(value);
                if (parsedColor) {
                    node.children.push({
                        type: 'element',
                        tagName: 'span',
                        properties: {
                            className: [options.customClassName],
                            style: 'background-color: ' + parsedColor.formatHex() + ';'
                        },
                        children: []
                    });
                }
            }
        });
    };
}
Object.defineProperty(exports, '__esModule', {value: true}).default = plugin;
