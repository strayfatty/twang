import { MithrilComponent } from "components/mithril-component";
import { StreamList } from "components/stream-list";
import {
    getStreamsFollowed,
    getUserId,
    isAuthenticated,
    Stream,
} from "lib/twitch";
import m from "mithril";

export class Dashboard extends MithrilComponent {
    private streams: Stream[] = null;

    async oninit(_: m.Vnode<any, this>) {
        const userId = getUserId();
        if (!userId || !isAuthenticated()) {
            return;
        }

        this.streams = await getStreamsFollowed({ user_id: userId });
        m.redraw();
    }

    render() {
        if (!isAuthenticated()) {
            return <div />;
        }

        return (
            <div class="dashboard">
                <StreamList
                    url="https://www.twitch.tv/directory/following"
                    title="Following"
                    streams={this.streams}
                />
            </div>
        );
    }
}
