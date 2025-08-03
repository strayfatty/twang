import m from "mithril";
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
                <img
                    class="w-full"
                    alt={stream.title}
                    src={stream.thumbnail_url}
                />
                <div class="flex gap-1">
                    <img
                        class="size-[40px]"
                        alt={stream.user_name}
                        src={stream.profile_image_url}
                    />
                    <div class="flex flex-col">
                        <a
                            class="h-[22px] font-bold"
                            href={`https://twitch.tv/${stream.user_login}`}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                        >
                            {stream.user_name}
                        </a>
                        <div class="h-[18px] text-sm opacity-[0.6]">{`${stream.viewer_count} viewers`}</div>
                    </div>
                </div>
                <div class="truncate font-bold" title={stream.game_name}>
                    {stream.game_name}
                </div>
                <div class="truncate font-bold text-xs" title={stream.title}>
                    {stream.title}
                </div>
            </div>
        );
    }
}
