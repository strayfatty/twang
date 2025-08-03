import m from "mithril";
import { MithrilComponent } from "~/components/mithril-component";
import { StreamCard } from "~/components/stream-card";
import { Stream } from "~/lib/twitch";
import { cn } from "~/lib/utils";

type Props = {
    url: string;
    title: string;
    streams: Stream[] | null;
};

export class StreamList extends MithrilComponent<Props> {
    render(props: Props) {
        return (
            <div class={cn('stream-list', {
                "is-loading": props.streams == null,
                "is-empty": props.streams?.length === 0,
            })}>
                <a
                    class="stream-list__title"
                    href={props.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                >
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
