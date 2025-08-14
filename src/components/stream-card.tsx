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
                <div class="relative w-full overflow-hidden">
                    <div style="padding-block-end: 56.25%" />
                    <div class="absolute top-0 left-0 min-h-full w-full">
                        <img
                            class="w-full rounded-md"
                            alt={stream.title}
                            src={stream.thumbnail_url}
                        />
                    </div>
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
