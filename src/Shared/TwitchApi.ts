export interface Stream {
    id: string;
    userId: string;
    userName: string;
    userLogo: string;
    gameId: string;
    gameName: string;
    type: string;
    title: string;
    url: string;
    viewers: number;
    startedAt: string;
    language: string;
    thumbnailUrl: string;
}

export interface Game {
    id: string;
    name: string;
    boxArtUrl: string;
}

export interface TwitchApi {
    getFollowedStreams(): Promise<Stream[]>;
    getGameStreams(name: string): Promise<Stream[]>;
    searchGames(query: string): Promise<Game[]>;
}