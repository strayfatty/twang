import "./StreamList.css";
import m from "mithril";
import { StreamListModel } from "Components/StreamListModel";
import { StreamCard } from "Components/StreamCard";

export class StreamList implements m.Component<StreamListModel> {
    view(vnode: m.Vnode<StreamListModel>) {
        const model = vnode.attrs;
        const streams = model.streams || [];
        return m(".stream-list", [
            m("a.stream-list__title", {
                href: model.url,
                target: "_blank"
            }, model.title),
            m(".stream-list__streams", streams.map(stream => m(StreamCard, stream)))
        ]);
    }
}
