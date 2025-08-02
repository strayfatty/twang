import "./stream-list.css";
import m from "mithril";
import { MithrilComponent } from "~/components/mithril-component";
import { StreamCard } from "~/components/stream-card";
import { Stream } from "~/lib/twitch";

type Props = {
    url: string;
    title: string;
    streams: Stream[] | null;
};

export class StreamList extends MithrilComponent<Props> {
    render(props: Props) {
        const state =
            props.streams == null
                ? "is-loading"
                : props.streams.length === 0
                  ? "is-empty"
                  : "";

        return (
            <div class={`stream-list ${state}`}>
                <a class="stream-list__title" href={props.url} target="_blank">
                    {props.title}
                </a>
                <div class="stream-list__loading" />
                <div class="stream-list__empty">no streams found</div>
                <div class="stream-list__streams">
                    {props.streams?.map((stream) => (
                        <StreamCard key={stream.id} stream={stream} />
                    ))}
                </div>
            </div>
        );
    }
}
