import * as m from 'mithril';

import { buildQueryString } from 'Shared/Api';
import { Game, Stream, TwitchApi } from 'Shared/TwitchApi';

export class TwitchApiV5 implements TwitchApi {
    constructor(private client_id: string, private access_token: () => string) {
    }

    getFollowedStreams(): Promise<Stream[]> {
        return this.__streamsFollowed('live', 100, 0)
            .then(response => {
                return response.streams.map(mapTwitchStream);
            });
    }

    getGameStreams(name: string): Promise<Stream[]> {
        return this.__streams(name, 'live', 6, 0)
            .then(response => {
                return response.streams.map(mapTwitchStream);
            });
    }

    searchGames(query: string): Promise<Game[]> {
        return this.__searchGames(query)
            .then(response => {
                return (response.games || []).map(mapTwitchGame);
            });
    }

    __streams(game: string, stream_type: string, limit: number, offset: number): Promise<TwitchStreamsResponse> {
        return this.get<TwitchStreamsResponse>('streams', {
            game: game,
            stream_type: stream_type,
            limit: limit,
            offset: offset
        });
    }

    __streamsFollowed(stream_type: string, limit: number, offset: number): Promise<TwitchStreamsResponse> {
        return this.get<TwitchStreamsResponse>('streams/followed', {
            stream_type: stream_type,
            limit: limit,
            offset: offset
        });
    }

    __searchGames(query: string): Promise<TwitchGamesResponse> {
        return this.get<TwitchGamesResponse>('search/games', {
            query: query
        });
    }

    private get<T>(endpoint: string, params?: any): Promise<any> {
        return m.request<any>({
            url: createUrl(endpoint, params),
            method: 'GET',
            headers: {
                Accept: 'application/vnd.twitchtv.v5+json',
                Authorization: 'OAuth ' + this.access_token(),
                'Client-ID': this.client_id,
            }
        });
    }
}

interface TwitchChannel {
    _id: number;
    broadcaster_language: string;
    created_at: string;
    display_name: string;
    followers: number,
    game: string;
    language: string;
    logo: string;
    mature: boolean,
    name: string;
    partner: boolean,
    profile_banner: string;
    profile_banner_background_color: string,
    status: string;
    updated_at: string;
    url: string;
    video_banner: string;
    views: number
}

interface TwitchStream {
    _id: number;
    average_fps: 60;
    channel: TwitchChannel;
    created_at: string;
    delay: number;
    game: string;
    is_playlist: false;
    preview: {
        large: string;
        medium: string;
        small: string;
        template: string;
    };
    video_height: number;
    viewers: number;
}

interface TwitchStreamsResponse {
    _total: number;
    streams: TwitchStream[];
}

interface TwitchGame {
    _id: number;
    box: {
        large: string;
        medium: string;
        small: string;
        template: string;
    };
    giantbomb_id: number;
    logo: {
        large: string;
        medium: string;
        small: string;
        template: string;
    };
    name: string;
    popularity: number;
}

interface TwitchGamesResponse {
    games: TwitchGame[];
}

function createUrl(endpoint: string, params?: any) {
    const base = 'https://api.twitch.tv/kraken/';
    const query = buildQueryString(params);
    return base + endpoint + query;
}

function mapTwitchStream(source: TwitchStream): Stream {
    return {
        id: '' + source._id,
        userId: '' + source.channel._id,
        userName: source.channel.display_name,
        userLogo: source.channel.logo,
        gameId: null,
        gameName: source.game,
        type: 'live',
        title: source.channel.status,
        url: source.channel.url,
        viewers: source.viewers,
        startedAt: source.created_at,
        language: source.channel.broadcaster_language,
        thumbnailUrl: source.preview.template
    };
}

function mapTwitchGame(source: TwitchGame): Game {
    return {
        id: '' + source._id,
        name: source.name,
        boxArtUrl: source.box.template
    };
}
