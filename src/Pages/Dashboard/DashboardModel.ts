import { StreamCardModel } from "Components/StreamCardModel";
import { Storage } from "Shared/Storage";
import { Stream, TwitchApi } from "Twitch/TwitchApi";

export class DashboardModel {
    isAuthenticated: boolean;
    games: Game[];
    streams: { [key: string]: any[] };
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
        // TODO add followed games from storage
    }

    private async loadFollowedStreams(): Promise<void> {
        const query = { user_id: this.storage.getUserId() };
        const { data } = await this.twitch.get_streams_followed(query);

        // TODO: load user profile pictures
        const streams = data.map(toStreamCardModel);
        this.streams[""] = streams;
        this.onChange();
    }
}

function toStreamCardModel(stream: Stream): StreamCardModel {
    return {
        url: `https://twitch.tv/${stream.user_login}`,
        title: stream.title,
        userName: stream.user_name,
        gameName: stream.game_name,
        thumbnailUrl: (stream.thumbnail_url || "")
            .replace(/{width}/, "320")
            .replace(/{height}/, "180"),
        profileImageUrl: "",
        viewers: stream.viewer_count
    };
}

type Game = {
    id: string;
    url: string;
    name: string;
    load: () => Promise<any>;
}
