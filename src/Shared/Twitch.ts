import * as m from 'mithril';

import { buildQueryString } from 'Shared/Api';
import { Auth } from 'Shared/Auth';
import { Game, Stream, TwitchApi } from 'Shared/TwitchApi';
import { TwitchApiV5 } from 'Shared/TwitchApiV5';

export class Twitch {
    static client_id: string = '7ikopbkspr7556owm9krqmalvr2w0i4';
    static api: TwitchApi = new TwitchApiV5(Twitch.client_id, Auth.access_token)

    static loginUrl(): string {
        const base = 'https://id.twitch.tv/oauth2/authorize';
        const clientId = '?client_id=' + Twitch.client_id;
        const redirectUri = '&redirect_uri=http%3A%2F%2Flocalhost%2Ftwang%2Fdev%2F%23!%2Floginresult';
        const responseType = '&response_type=token'
        return base + clientId + redirectUri + responseType;
    }

    static revoke(access_token: string): void {
        const params = {
            client_id: Twitch.client_id,
            token: access_token
        };

        const base = 'https://id.twitch.tv/oauth2/revoke';
        const query = buildQueryString(params);
        m.request({ url: base + query, method: 'POST' });
    }

    static getFollowedStreams(): Promise<Stream[]> {
        return this.api.getFollowedStreams();
    }

    static getGameStreams(name: string): Promise<Stream[]> {
        return this.api.getGameStreams(name);
    }

    static searchGames(query: string): Promise<Game[]> {
        return this.api.searchGames(query);
    }
}
