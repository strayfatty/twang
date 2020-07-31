import * as m from 'mithril';

import { buildQueryString } from 'Shared/Api';
import { Game, Stream, TwitchApi, User } from 'Shared/TwitchApi';

export class TwitchApiNew implements TwitchApi {
    constructor(private client_id: string, private access_token: () => string) {
    }

    getCurrentUser(): Promise<User> {
        return this.users()
            .then(response => mapTwitchUser(response.data[0]));
    }

    getFollowedStreams(): Promise<Stream[]> {
        console.error('not implemented');
        return null;
    }

    getGameStreams(name: string): Promise<Stream[]> {
        console.error('not implemented');
        return null;
    }

    searchGames(query: string): Promise<Game[]> {
        console.error('not implemented');
        return null;
    }

    users(id?: string | string[]): Promise<TwitchResponse<TwitchUser>> {
        return this.get<TwitchUser>('users', { id: id });
    }

    userFollows(from_id?: string, to_id?: string, first?: number, after?: string): Promise<TwitchResponse<TwitchFollow>> {
        return this.get<TwitchFollow>('users/follows', {
            from_id: from_id,
            to_id: to_id,
            first: first,
            after: after
        });
    }

    streams(user_id?: string | string[], game_id?: string | string[], first?: number, after?: string): Promise<TwitchResponse<TwitchStream>> {
        return this.get<TwitchStream>('streams', {
            user_id: user_id,
            game_id: game_id,
            first: first,
            after: after
        });
    }

    games(id?: string | string[], name?: string | string[]): Promise<TwitchResponse<TwitchGame>> {
        return this.get<TwitchGame>('games', {
            id: id,
            name: name
        })
    }

    private get<T>(endpoint: string, params?: any): Promise<TwitchResponse<T>> {
        return m.request<TwitchResponse<T>>({
            url: createUrl(endpoint, params),
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.access_token(),
                'Client-ID': this.client_id,
            }
        });
    }
}

export interface TwitchUser {
    id: string;
    login: string;
    display_name: string;
    profile_image_url: string;
}

export interface TwitchFollow {
    from_id: string;
    from_name: string;
    to_id: string;
    to_name: string;
    followed_at: string;
}

export interface TwitchStream {
    id: string;
    user_id: string;
    user_name: string;
    game_id: string;
    type: string;
    title: string;
    viewer_count: number;
    started_at: string;
    language: string;
    thumbnail_url: string;
}

export interface TwitchGame {
    id: string;
    name: string;
    box_art_url: string;
}

export interface TwitchResponse<T> {
    total: number;
    data: T[];
    pagination: { cursor: string };
}

function createUrl(endpoint: string, params?: any) {
    const base = 'https://api.twitch.tv/helix/';
    const query = buildQueryString(params);
    return base + endpoint + query;
}

function mapTwitchUser(source: TwitchUser): User {
    return {
        id: source.id,
        login: source.login,
        displayName: source.display_name,
        profileImageUrl: (source.profile_image_url || '').replace(/300x300/, '50x50')
    };
}