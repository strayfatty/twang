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
    private static readonly AUTO_RELOAD_INTERVAL_MS = 5 * 60 * 1000;

    private streams: Stream[] | null = null;
    private loading = false;
    private lastReloadAt: number | null = null;

    async oninit(_: m.Vnode<any, this>) {
        await this.loadStreams();
    }

    oncreate(_: m.VnodeDOM<any, this>) {
        document.addEventListener("visibilitychange", this.onVisibilityChange);
        window.addEventListener("focus", this.onVisibilityChange);
    }

    onremove(_: m.VnodeDOM<any, this>) {
        document.removeEventListener(
            "visibilitychange",
            this.onVisibilityChange,
        );
        window.removeEventListener("focus", this.onVisibilityChange);
    }

    private shouldAutoReload(now = Date.now()) {
        return (
            this.lastReloadAt &&
            now - this.lastReloadAt > Dashboard.AUTO_RELOAD_INTERVAL_MS
        );
    }

    private onVisibilityChange = () => {
        if (document.visibilityState === "visible" && this.shouldAutoReload()) {
            void this.loadStreams();
        }
    };

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
            this.lastReloadAt = Date.now();
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
