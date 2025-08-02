import { buildQueryString } from "~/lib/buildQueryString";

const CLIENT_ID = "7ikopbkspr7556owm9krqmalvr2w0i4";
const USER_ID = "twitch:user_id";
const ACCESS_TOKEN = "twitch:access_token";

export type User = {
    id: string;
    login: string;
    display_name: string;
    broadcaster_type: "partner" | "affiliate" | "";
    description: string;
    offline_image_url: string;
    profile_image_url: string;
    type: "staff" | "admin" | "global_mod" | "";
    view_count: number;
    email?: string;
    created_at: string;
};

export type Stream = {
    id: string;
    user_id: string;
    user_login: string;
    user_name: string;
    game_id: string;
    game_name: string;
    type: "live" | "";
    title: string;
    viewer_count: number;
    started_at: string;
    language: string;
    thumbnail_url: string;
    profile_image_url: string;
};

export function getUserId(): string {
    return localStorage.getItem(USER_ID) ?? "";
}

export function setUserId(value: string) {
    localStorage.setItem(USER_ID, value);
}

export function getAccessToken(): string {
    return localStorage.getItem(ACCESS_TOKEN) ?? "";
}

export function setAccessToken(value: string) {
    localStorage.setItem(ACCESS_TOKEN, value);
}

export function isAuthenticated(): boolean {
    return !!getAccessToken();
}

export function getLoginUrl(): string {
    const location = window.location.origin + window.location.pathname;
    const redirectUri = `${location}signin-complete/`;

    const base = "https://id.twitch.tv/oauth2/authorize";
    const params = {
        client_id: CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: "token",
        scope: "user:read:follows",
    };

    return base + buildQueryString(params);
}

export async function logout() {
    if (isAuthenticated()) {
        await revoke();
    }

    localStorage.removeItem(USER_ID);
    localStorage.removeItem(ACCESS_TOKEN);
}

export function getUsers(query: {
    id?: string | string[];
    login?: string | string[];
}) {
    return get<User>("users", query);
}

export async function getStreamsFollowed(query: {
    user_id: string;
    after?: string;
    first?: number;
}) {
    const streams = await get<Stream>("streams/followed", query);
    streams.forEach(updateThumbnailDimensions);
    await loadProfileImages(streams);
    return streams;
}

async function revoke() {
    const params = {
        client_id: CLIENT_ID,
        token: getAccessToken(),
    };

    const url = `https://id.twitch.tv/oauth2/revoke${buildQueryString(params)}`;
    await fetch(url, { method: "POST" });
}

async function get<T>(endpoint: string, params?: any): Promise<T[]> {
    try {
        const url = `https://api.twitch.tv/helix/${endpoint}${buildQueryString(params)}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                "Client-ID": CLIENT_ID,
            },
        });

        if (!response.ok) {
            throw new Error(
                `API request failed: ${response.status} ${response.statusText}`,
            );
        }

        const { data } = await response.json();
        return data ?? [];
    } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error);
        return [];
    }
}

function updateThumbnailDimensions(stream: Stream) {
    stream.thumbnail_url = (stream.thumbnail_url || "")
        .replace(/{width}/, "320")
        .replace(/{height}/, "180");
}

async function loadProfileImages(streams: Stream[]) {
    if (streams.length === 0) {
        return;
    }

    const ids = streams
        .map((x) => x.user_id)
        .filter((value, index, self) => self.indexOf(value) === index);

    const users = await getUsers({ id: ids });
    const pictures = users.reduce((acc: { [key: string]: string }, curr) => {
        acc[curr.id] = curr.profile_image_url;
        return acc;
    }, {});

    streams.forEach((stream) => {
        stream.profile_image_url = pictures[stream.user_id];
    });
}
