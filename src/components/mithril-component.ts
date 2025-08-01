import m, { ChildArrayOrPrimitive } from 'mithril';

export abstract class MithrilComponent<Props = {}> implements m.ClassComponent<Props> {
    __tsx_props: Props & {
        class?: string | undefined;
        key?: string | number | undefined;
    };

    view(vnode: m.Vnode<Props, this>): m.Children | null | void {
        return this.render(vnode.attrs, vnode.children);
    }

    abstract render(props: Props, children: ChildArrayOrPrimitive | undefined): m.Children | null | void;
}

declare global {
    namespace JSX {
        // Where to look for component type information
        interface ElementAttributesProperty {
            __tsx_props: any;
        }
    }
}
