import "./stream-list.css";
import m from "mithril";
import { StreamCard } from "Components/stream-card";
import { Stream } from "Twitch/TwitchApi";
import { MithrilComponent } from "./mithril-component";

type Props = {
    url: string;
    title: string;
    streams: Stream[];
};

export class StreamList extends MithrilComponent<Props> {
    render(props: Props) {
        return (
            <div class="stream-list">
                <a class="stream-list__title" href={props.url} target="_blank">{props.title}</a>
                <div class="stream-list__loading" />
                <div class="stream-list__empty">no streams found</div>
                <div class="stream-list__streams">
                    {props.streams?.map(stream => <StreamCard stream={stream} />)}
                </div>
            </div>
        );
    }
}
