import type { Root } from 'hast';
interface Options {
    customClassName: string;
    location: Location;
}
declare type Location = "after" | "before";
declare function plugin(options?: Options): (tree: Root) => void;
export default plugin;
