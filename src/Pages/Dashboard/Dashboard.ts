import m from "mithril";
import { DashboardModel } from "Pages/Dashboard/DashboardModel";
import { StreamList } from "Components/stream-list";

export class Dashboard implements m.ClassComponent<DashboardModel> {
    oninit(vnode: m.Vnode<DashboardModel>) {
        vnode.attrs.onChange = () => m.redraw();
    }

    view(vnode: m.Vnode<DashboardModel>): void | m.Children {
        const model = vnode.attrs;
        return m(".dashboard", model.games.map(game => {
            const streams = model.streams[game.id];
            return m(StreamList, {
                url: game.url,
                title: game.name,
                streams: streams
            })
        }));
    }
}
