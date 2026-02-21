import m from "mithril";
import { Button } from "~/components/button";
import { RefreshCcwIcon } from "~/components/icons/refresh-ccw-icon";
import { Link } from "~/components/link";
import { MithrilComponent } from "~/components/mithril-component";
import { Spinner } from "~/components/spinner";
import { StreamCard } from "~/components/stream-card";
import { Stream } from "~/lib/twitch";
import { cn } from "~/lib/utils";

type Props = {
    url: string;
    title: string;
    streams: Stream[] | null;
    loading: boolean;
    onReload: () => void;
};

export class StreamList extends MithrilComponent<Props> {
    render(props: Props) {
        return (
            <div class="flex flex-col">
                <div class="flex items-end gap-2">
                    <Link
                        class="font-bold text-2xl"
                        href={props.url}
                        target="_blank"
                    >
                        {props.title}
                    </Link>
                    <Button
                        aria-label="Reload streams"
                        class={cn("opacity-60 self-center", {
                            hidden: props.loading,
                        })}
                        onclick={props.onReload}
                        title="Reload streams"
                    >
                        <RefreshCcwIcon
                            class="size-[16px]"
                            title="Reload streams"
                        />
                    </Button>
                    <Spinner visible={props.loading} />
                    <div
                        class={cn("font-bold opacity-60", {
                            hidden:
                                props.loading || props.streams?.length !== 0,
                        })}
                    >
                        no streams found
                    </div>
                </div>
                <div class="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-x-1 gap-y-2 border-t border-t-dracula-comment border-solid pt-1">
                    {props.streams?.map((stream) => (
                        <StreamCard key={stream.id} stream={stream} />
                    ))}
                </div>
            </div>
        );
    }
}
