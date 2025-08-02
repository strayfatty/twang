import { injectAnalytics } from "~/lib/injectAnalytics";
import {
    getUsers,
    isAuthenticated,
    logout,
    setAccessToken,
    setUserId,
} from "~/lib/twitch";

injectAnalytics();
login().finally(() => {
    location.href = "/";
});

async function login(): Promise<void> {
    if (isAuthenticated()) {
        await logout();
    }

    const params = new URLSearchParams(location.hash?.substring(1));
    const accessToken = params.get("access_token");
    if (!accessToken) {
        return;
    }

    setAccessToken(accessToken);

    try {
        const users = await getUsers({});
        setUserId(users[0].id);
    } catch (error) {
        console.error("Failed to get user data:", error);
        await logout();
    }
}
