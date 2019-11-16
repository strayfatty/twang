import { Stream, User } from 'Shared/TwitchApi';
import { Twitch } from 'Shared/Twitch';

let cache: { [id: string]: any } = { };

export class Model {
    static getGames(): string[] {
        const value = window.localStorage.getItem('games') || '[]';
        return JSON.parse(value);
    }

    static setGames(games: string[]): void {
        const value = JSON.stringify(games);
        window.localStorage.setItem('games', value);

        cache = { };
    }

    static getCurrentUser(): User {
        return getValue<User>('_user_', Twitch.getCurrentUser);
    }

    static getFollowedStreams(): Stream[] {
        return getValue<Stream[]>('_followed_', Twitch.getFollowedStreams);
    }

    static getGameStreams(name: string): Stream[] {
        return getValue<Stream[]>(name, Twitch.getGameStreams);
    }
}

interface Item<T> {
    promise: Promise<T>;
    value: T;
}

function getValue<T>(key: string, callback: (key: string) => Promise<T>): T {
    let item: Item<T> = cache[key];
    if (!item) {
        item = { promise: null, value: null };
        cache[key] = item;
    }

    if (!item.promise) {
        item.promise = callback(key)
            .then(value => item.value = value);
    }

    return item.value;
}