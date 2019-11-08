import './Icon.css';
import * as m from 'mithril';

interface IconAttrs {
    class?: string;
}

export class Icon implements m.ClassComponent<IconAttrs> {
    svg: string;

    constructor(svg: string) {
        this.svg = svg;
    }

    view(vnode: m.Vnode<IconAttrs>) {
        return m('span.icon', {
            class: vnode.attrs.class
        }, m.trust(this.svg));
    }
}