import * as m from 'mithril';

import { buildQueryString } from 'Shared/Api';
import { Auth } from 'Shared/Auth';
import { Game, Stream, TwitchApi, User } from 'Shared/TwitchApi';
import { TwitchApiNew } from 'Shared/TwitchApiNew';
import { TwitchApiV5 } from 'Shared/TwitchApiV5';

export class Twitch {
    static client_id: string = '7ikopbkspr7556owm9krqmalvr2w0i4';
    static apiNew: TwitchApi = new TwitchApiNew(Twitch.client_id, Auth.access_token)
    static apiV5: TwitchApi = new TwitchApiV5(Twitch.client_id, Auth.access_token)

    static loginUrl(): string {
        const location = window.location.origin + window.location.pathname;
        const redirectUri = location + '#!/loginresult';

        const base = 'https://id.twitch.tv/oauth2/authorize';
        const params = {
            client_id: Twitch.client_id,
            redirect_uri: redirectUri,
            response_type: 'token'
        };

        return base + buildQueryString(params);
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

    static getCurrentUser(): Promise<User> {
        return Twitch.apiNew.getCurrentUser();
    }

    static getFollowedStreams(): Promise<Stream[]> {
        return Twitch.apiV5.getFollowedStreams();
    }

    static getGameStreams(name: string): Promise<Stream[]> {
        return Twitch.apiV5.getGameStreams(name);
    }

    static searchGames(query: string): Promise<Game[]> {
        return Twitch.apiV5.searchGames(query);
    }
}
