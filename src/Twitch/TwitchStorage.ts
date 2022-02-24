export type TwitchStorage = {
    getUserId: () => string;
    setUserId: (value: string) => void;
    getAccessToken: () => string;
    setAccessToken: (value: string) => void;
}
