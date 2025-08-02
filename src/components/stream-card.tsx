import "./stream-card.css";
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
            <div class="stream-card">
                <img
                    class="stream-card__preview"
                    alt={stream.title}
                    src={stream.thumbnail_url}
                />
                {stream.profile_image_url ? (
                    <img
                        class="stream-card__profile-image"
                        alt={stream.user_name}
                        src={stream.profile_image_url}
                    />
                ) : null}
                <a
                    class="stream-card__user"
                    href={`https://twitch.tv/${stream.user_login}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                >
                    {stream.user_name}
                </a>
                <div class="stream-card__viewers">{`${stream.viewer_count} viewers`}</div>
                <div class="stream-card__game" title={stream.game_name}>
                    {stream.game_name}
                </div>
                <div class="stream-card__title" title={stream.title}>
                    {stream.title}
                </div>
            </div>
        );
    }
}
