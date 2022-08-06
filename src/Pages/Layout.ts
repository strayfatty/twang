import "./Layout.css";
import m from "mithril";
import { LayoutModel } from "Pages/LayoutModel";
import { Navigation } from "Pages/Navigation";

export class Layout implements m.Component<LayoutModel> {
    view(vnode: m.Vnode<LayoutModel>) {
        return [
            m(Navigation, vnode.attrs),
            m("section", vnode.children)
        ];
    }
}
