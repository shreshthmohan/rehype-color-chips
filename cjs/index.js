'use strict';
const { visit } = require('unist-util-visit');
const { toString } = require('hast-util-to-string');
const { color } = require('d3-color');
function plugin(options) {
    if (options === void 0) { options = { customClassName: 'gfm-color-chip' }; }
    return function (tree) {
        visit(tree, 'element', function (node) {
            var _a;
            if (node.tagName === 'code' && node.properties) {
                var value = toString(node);
                if (color(value)) {
                    node.children.push({
                        type: 'element',
                        tagName: 'span',
                        properties: {
                            className: [options.customClassName],
                            style: 'background-color: ' + ((_a = color(value)) === null || _a === void 0 ? void 0 : _a.formatHex()) + ';'
                        },
                        children: []
                    });
                }
            }
        });
    };
}
Object.defineProperty(exports, '__esModule', {value: true}).default = plugin;
