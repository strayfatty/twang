import { TwitchStorage } from "Twitch/TwitchStorage";

const USER_ID = "twitch:user_id";
const ACCESS_TOKEN = "twitch:access_token";

export class Storage implements TwitchStorage {
    getUserId(): string {
        return localStorage.getItem(USER_ID);
    }

    setUserId(userId: string): void {
        if (userId) {
            localStorage.setItem(USER_ID, userId);
        } else {
            localStorage.removeItem(USER_ID);
        }
    }

    getAccessToken(): string {
        return localStorage.getItem(ACCESS_TOKEN);
    }

    setAccessToken(accessToken: string): void {
        if (accessToken) {
            localStorage.setItem(ACCESS_TOKEN, accessToken);
        } else {
            localStorage.removeItem(ACCESS_TOKEN);
        }
    }
}
