'use strict';
const { visit } = require('unist-util-visit');
const { toString } = require('hast-util-to-string');
const { color } = require('d3-color');
function plugin(options = { customClassName: 'gfm-color-chip', location: 'after' }) {
    return (tree) => {
        var _a, _b;
        const customClassName = (_a = options.customClassName) !== null && _a !== void 0 ? _a : 'gfm-color-chip';
        const location = (_b = options.location) !== null && _b !== void 0 ? _b : 'after';
        const nodesToModify = [];
        visit(tree, 'element', function (node, index, parent) {
            if (node.tagName === 'code' && node.properties) {
                const value = toString(node);
                const parsedColor = color(value);
                if (parsedColor && parent && typeof index === 'number') {
                    nodesToModify.push({ node, index, parent, colorValue: parsedColor.formatHex() });
                }
            }
        });
        for (let i = nodesToModify.length - 1; i >= 0; i--) {
            const { node, index, parent, colorValue } = nodesToModify[i];
            const newNode = {
                type: 'element',
                tagName: 'span',
                properties: {
                    className: [customClassName],
                    style: 'background-color: ' + colorValue + ';',
                },
                children: [],
            };
            if (location === 'before') {
                parent.children.splice(index, 0, newNode);
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
