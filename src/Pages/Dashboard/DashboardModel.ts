import { Storage } from "Shared/Storage";
import { Stream, TwitchApi } from "Twitch/TwitchApi";

export class DashboardModel {
    isAuthenticated: boolean;
    games: Game[];
    streams: { [key: string]: Stream[] };
    onChange: () => void;

    constructor(private storage: Storage, private twitch: TwitchApi) {
        this.isAuthenticated = twitch.isAuthenticated();
        this.games = [];
        this.streams = {};
        this.onChange = () => {};

        if (this.isAuthenticated) {
            this.initialize();
        }
    }

    private async initialize(): Promise<void> {
        this.loadGames();
        this.games.forEach(game => game.load());
    }

    private loadGames(): void {
        this.games.push({
            id: "",
            name: "Following",
            url: "https://www.twitch.tv/directory/following",
            load: () => this.loadFollowedStreams()
        });
    }

    private async loadFollowedStreams(): Promise<void> {
        const query = { user_id: this.storage.getUserId() };
        const { data } = await this.twitch.get_streams_followed(query);

        data.forEach(stream => {
            stream.thumbnail_url = (stream.thumbnail_url || "")
                .replace(/{width}/, "320")
                .replace(/{height}/, "180");
        });
        this.streams[""] = data;
        this.onChange();

        await this.loadProfileImages(data);
        this.onChange();
    }

    private async loadProfileImages(streams: Stream[]): Promise<void> {
        const ids = streams.map(x => x.user_id)
            .filter((value, index, self) => self.indexOf(value) === index);

        const { data } = await this.twitch.get_users({ id: ids });
        const pictures = data.reduce((acc: { [key: string]: string }, curr) => {
            acc[curr.id] = curr.profile_image_url;
            return acc;
        }, {});

        streams.forEach(stream => stream.profile_image_url = pictures[stream.user_id]);
    }
}

type Game = {
    id: string;
    url: string;
    name: string;
    load: () => Promise<any>;
}
