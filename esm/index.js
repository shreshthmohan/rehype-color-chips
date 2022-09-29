import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';
import { color } from 'd3-color';
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
export default plugin;
