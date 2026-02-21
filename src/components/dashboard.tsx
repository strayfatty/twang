import m from "mithril";
import { MithrilComponent } from "~/components/mithril-component";
import { StreamList } from "~/components/stream-list";
import {
    getStreamsFollowed,
    getUserId,
    isAuthenticated,
    Stream,
} from "~/lib/twitch";

export class Dashboard extends MithrilComponent {
    private streams: Stream[] = null;
    private loading = false;

    async oninit(_: m.Vnode<any, this>) {
        await this.loadStreams();
    }

    private async loadStreams() {
        if (this.loading) {
            return;
        }

        const userId = getUserId();
        if (!userId || !isAuthenticated()) {
            return;
        }

        this.loading = true;
        m.redraw();

        try {
            this.streams = await getStreamsFollowed({ user_id: userId });
        } finally {
            this.loading = false;
            m.redraw();
        }
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
                    loading={this.loading}
                    onReload={() => void this.loadStreams()}
                />
            </div>
        );
    }
}
