import type { Root } from 'hast';
declare function plugin(options?: {
    customClassName: string;
}): (tree: Root) => void;
export default plugin;
