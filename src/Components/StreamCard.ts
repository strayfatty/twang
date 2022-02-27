import "./StreamCard.css";
import m from "mithril";
import { StreamCardModel } from "Components/StreamCardModel";

export class StreamCard implements m.Component<StreamCardModel> {
    view(vnode: m.Vnode<StreamCardModel>) {
        const model = vnode.attrs;
        return m(".stream-card", [
            m("img.stream-card__preview", {
                alt: model.title,
                src: model.thumbnailUrl
            }),
            m("img.stream-card__profile-image", {
                src: model.profileImageUrl
            }),
            m("a.stream-card__user", {
                href: model.url,
                target: "_blank"
            }, model.userName),
            m(".stream-card__viewers", `${model.viewers} viewers`),
            m(".stream-card__game", { title: model.gameName }, model.gameName),
            m(".stream-card__title", { title: model.title }, model.title)
        ])
    }
}
