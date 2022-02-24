import { buildQueryString } from "Shared/buildQueryString";
import { TwitchStorage } from "Twitch/TwitchStorage";

const client_id: string = "7ikopbkspr7556owm9krqmalvr2w0i4";

export class TwitchApi {
    constructor(private storage: TwitchStorage) {
    }

    isAuthenticated(): boolean {
        return !!this.storage.getAccessToken();
    }

    getLoginUrl(): string {
        const location = window.location.origin + window.location.pathname;
        const redirectUri = location + "signin-complete/";

        const base = "https://id.twitch.tv/oauth2/authorize";
        const params = {
            client_id: client_id,
            redirect_uri: redirectUri,
            response_type: "token"
        };

        return base + buildQueryString(params);
    }

    async logout(): Promise<void> {
        if (this.isAuthenticated()) {
            await this.revoke();
        }

        this.storage.setUserId(null);
        this.storage.setAccessToken(null);
    }

    get_users(query: {
        id?: string | string[];
        login?: string | string[];
    }): Promise<Response<User>> {
        return this.get<User>("users", query);
    }

    private async revoke(): Promise<void> {
        const params = {
            client_id: client_id,
            token: this.storage.getAccessToken()
        };

        const url = `https://id.twitch.tv/oauth2/revoke${buildQueryString(params)}`;
        await fetch(url, { method: "POST" });
    }

    private async get<T>(endpoint: string, params?: any): Promise<Response<T>> {
        const url = `https://api.twitch.tv/helix/${endpoint}${buildQueryString(params)}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + this.storage.getAccessToken(),
                'Client-ID': client_id
            }
        });

        return response.json();
    }
}

type Response<T> = {
    data: T[];
};

type User = {
    id: string;
    login: string;
    display_name: string;
    breadcaster_type: "partner" | "affiliate" | "";
    description: string;
    offline_image_url: string;
    profile_image_url: string;
    type: "staff" | "admin" | "global_mod" | "";
    view_count: number;
    email?: string;
    created_at: string;
};
