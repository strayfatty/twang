import m from "mithril";
import { MithrilComponent } from "~/components/mithril-component";
import { StreamCard } from "~/components/stream-card";
import { Stream } from "~/lib/twitch";
import { cn } from "~/lib/utils";
import { Spinner } from "./spinner";

type Props = {
    url: string;
    title: string;
    streams: Stream[] | null;
};

export class StreamList extends MithrilComponent<Props> {
    render(props: Props) {
        return (
            <div class="flex flex-col">
                <div class="flex items-end gap-2">
                    <a
                        class="font-bold text-2xl"
                        href={props.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                    >
                        {props.title}
                    </a>
                    <Spinner visible={!props.streams} />
                    <div
                        class={cn("font-bold opacity-60", {
                            hidden: props.streams?.length !== 0,
                        })}
                    >
                        no streams found
                    </div>
                </div>
                <div class="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-x-1 gap-y-2 border-t border-t-[var(--draculaComment)] border-t-solid pt-1">
                    {props.streams?.map((stream) => (
                        <StreamCard key={stream.id} stream={stream} />
                    ))}
                </div>
            </div>
        );
    }
}
