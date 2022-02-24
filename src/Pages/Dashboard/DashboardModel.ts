import { Storage } from "Shared/Storage";

export class DashboardModel {
    isAuthenticated: boolean;
    games: any[];
    streams: { [key: string]: any[] };

    constructor() {
        this.isAuthenticated = false; // twitch.isAuthenticated()
        this.games = [];
        this.streams = {};

        // start loading games
        // start loading streams
    }
}
