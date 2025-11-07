'use strict';
const { visit } = require('unist-util-visit');
const { toString } = require('hast-util-to-string');
const { color } = require('d3-color');
function plugin(options) {
    if (options === void 0) { options = { customClassName: 'gfm-color-chip', location: 'after' }; }
    return function (tree) {
        var _a, _b;
        var customClassName = (_a = options.customClassName) !== null && _a !== void 0 ? _a : 'gfm-color-chip';
        var location = (_b = options.location) !== null && _b !== void 0 ? _b : 'after';
        var nodesToModify = [];
        visit(tree, 'element', function (node, index, parent) {
            if (node.tagName === 'code' && node.properties) {
                var value = toString(node);
                var parsedColor = color(value);
                if (parsedColor && parent && typeof index === 'number') {
                    nodesToModify.push({ node: node, index: index, parent: parent, colorValue: parsedColor.formatHex() });
                }
            }
        });
        for (var i = nodesToModify.length - 1; i >= 0; i--) {
            var _c = nodesToModify[i], node = _c.node, index = _c.index, parent_1 = _c.parent, colorValue = _c.colorValue;
            var newNode = {
                type: 'element',
                tagName: 'span',
                properties: {
                    className: [customClassName],
                    style: 'background-color: ' + colorValue + ';'
                },
                children: []
            };
            if (location === 'before') {
                parent_1.children.splice(index, 0, newNode);
            }
            else {
                node.children.push(newNode);
                if (location !== 'after') {
                    console.log('location is not before or after, defaulting to after', location);
                }
            }
        }
    };
}
Object.defineProperty(exports, '__esModule', {value: true}).default = plugin;
