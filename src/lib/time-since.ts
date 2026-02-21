export function timeSince(time: number) {
    const elapsedMs = Math.max(0, Date.now() - time);
    if (elapsedMs < 5_000) {
        return "just now";
    }

    if (elapsedMs < 60_000) {
        const seconds = Math.floor(elapsedMs / 1_000);
        return `${seconds}s ago`;
    }

    if (elapsedMs < 3_600_000) {
        const minutes = Math.floor(elapsedMs / 60_000);
        return `${minutes}m ago`;
    }

    if (elapsedMs < 86_400_000) {
        const hours = Math.floor(elapsedMs / 3_600_000);
        return `${hours}h ago`;
    }

    const days = Math.floor(elapsedMs / 86_400_000);
    return `${days}d ago`;
}
