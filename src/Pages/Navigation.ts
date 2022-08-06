import "./Navigation.css";
import m from "mithril";
import { LayoutModel } from "Pages/LayoutModel";

export class Navigation implements m.Component<LayoutModel> {
    view(vnode: m.Vnode<LayoutModel>): void | m.Children {
        const model = vnode.attrs;

        return m("nav", [
            m("a.title", { href: "/" }, "TWANG"),
            m("ul", []),
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
        ]);
    }
}
