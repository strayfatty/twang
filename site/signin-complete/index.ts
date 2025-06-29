import { injectAnalytics } from "Shared/injectAnalytics";
import { Storage } from "Shared/Storage";
import { TwitchApi } from "Twitch/TwitchApi";

const storage = new Storage();
const twitchApi = new TwitchApi(storage);

injectAnalytics();
login()
    .finally(() => location.href = "/")

async function login(): Promise<void> {
    if (twitchApi.isAuthenticated()) {
        await twitchApi.logout();
    }

    const params = new URLSearchParams(location.hash?.substring(1));
    const accessToken = params.get("access_token");
    if (!accessToken) {
        return;
    }

    storage.setAccessToken(accessToken);

    const { data } = await twitchApi.get_users({});
    storage.setUserId(data[0].id);
}
