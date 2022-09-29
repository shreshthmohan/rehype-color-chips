import type { Root } from 'hast';
interface Options {
    customClassName: string;
}
declare function plugin(options?: Options): (tree: Root) => void;
export default plugin;
