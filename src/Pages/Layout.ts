import "./Layout.css";
import m from "mithril";
import { LayoutModel } from "Pages/LayoutModel";

export class Layout implements m.Component<LayoutModel> {
    view(vnode: m.Vnode<LayoutModel>) {
        const model = vnode.attrs;

        return [
            m("header.layout__header", [
                m('a', {
                    class: "layout__brand",
                    href: "/"
                }, "TWANG"),
                m(''),
                m('button', {
                    onclick: async () => {
                        if (!model.isAuthenticated()) {
                            location.href = model.getLoginUrl();
                        } else {
                            await model.logout();
                            location.href = "/";
                        }
                    }
                }, model.isAuthenticated() ? "Logout" : "Login")
            ]),
            m('section.layout__content', vnode.children)
        ];
    }
}
