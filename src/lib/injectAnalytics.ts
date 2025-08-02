import { inject } from "@vercel/analytics";

export function injectAnalytics() {
    try {
        inject();
    } catch (error) {
        console.warn("Analytics injection failed", error);
    }
}
