import m, { ChildArrayOrPrimitive } from "mithril";

export abstract class MithrilComponent<Props = { [k: string]: never }>
    implements m.ClassComponent<Props>
{
    __tsx_props: Props & {
        class?: string | undefined;
        key?: string | number | undefined;
    };

    view(vnode: m.Vnode<Props, this>): m.Children | null | undefined {
        return this.render(vnode.attrs, vnode.children);
    }

    abstract render(
        props: Props,
        children: ChildArrayOrPrimitive | undefined,
    ): m.Children | null | undefined;
}

declare global {
    namespace JSX {
        // Where to look for component type information
        interface ElementAttributesProperty {
            __tsx_props: any;
        }
    }
}
