import { TwitchApi } from "Twitch/TwitchApi";

export class LayoutModel {
    constructor(private twitchApi: TwitchApi) {
    }

    isAuthenticated() {
        return this.twitchApi.isAuthenticated();
    }

    getLoginUrl() {
        return this.twitchApi.getLoginUrl();
    }

    logout(): Promise<void> {
        return this.twitchApi.logout();
    }
}
