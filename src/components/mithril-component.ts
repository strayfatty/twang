import m, { ChildArrayOrPrimitive } from 'mithril';

export abstract class MithrilComponent<Props = {}> implements m.ClassComponent<Props> {
    private __tsx_props: Props & {
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
        // Return type for elements
        interface Element extends m.Vnode<any, any> {
        }

        // Element names allowed – with attributes allowed
        interface IntrinsicElements {
            [elementName: string]: any
        }
        // Where to look for component type information
        interface ElementAttributesProperty {
            __tsx_props: any
        }
    }
}
