export class GameStore {
    static getGames(): string[] {
        const value = window.localStorage.getItem('games') || '[]';
        return JSON.parse(value);
    }

    static setGames(games: string[]) {
        const value = JSON.stringify(games);
        window.localStorage.setItem('games', value);
    }
}