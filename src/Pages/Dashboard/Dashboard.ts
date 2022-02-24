import m from "mithril";
import { DashboardModel } from "Pages/Dashboard/DashboardModel";

export class Dashboard implements m.ClassComponent<DashboardModel> {
    view(vnode: m.Vnode<DashboardModel, this>): void | m.Children {
        const model = vnode.attrs;
        return m("", "hallo");
    }
}
