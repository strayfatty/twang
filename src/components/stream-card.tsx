import m from "mithril";
import { Link } from "~/components/link";
import { MithrilComponent } from "~/components/mithril-component";
import { Stream } from "~/lib/twitch";

type Props = {
    stream: Stream;
};

export class StreamCard extends MithrilComponent<Props> {
    render(props: Props) {
        const stream = props.stream;
        return (
            <div class="flex w-full flex-col gap-1">
                <div class="relative w-full overflow-hidden rounded-md">
                    <div class="aspect-16/9 bg-[rgba(0,0,0,0.08)]" />
                    <img
                        class="absolute inset-0 h-full w-full"
                        alt={stream.title}
                        src={stream.thumbnail_url}
                    />
                </div>
                <div class="flex flex-col">
                    <div class="flex gap-1">
                        <img
                            class="size-[40px] rounded-full"
                            alt={stream.user_name}
                            src={stream.profile_image_url}
                        />
                        <div class="flex flex-col">
                            <Link
                                class="h-[22px] font-bold"
                                href={`https://twitch.tv/${stream.user_login}`}
                                target="_blank"
                            >
                                {stream.user_name}
                            </Link>
                            <div class="h-[18px] text-sm opacity-[0.6]">{`${stream.viewer_count} viewers`}</div>
                        </div>
                    </div>
                    <div class="truncate font-bold" title={stream.game_name}>
                        {stream.game_name}
                    </div>
                    <div
                        class="truncate font-bold text-xs"
                        title={stream.title}
                    >
                        {stream.title}
                    </div>
                </div>
            </div>
        );
    }
}
