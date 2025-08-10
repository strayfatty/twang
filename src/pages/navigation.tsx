import m from "mithril";
import { Link } from "~/components/link";
import { MithrilComponent } from "~/components/mithril-component";
import { getLoginUrl, isAuthenticated, logout } from "~/lib/twitch";

export class Navigation extends MithrilComponent {
    render() {
        const onClick = async () => {
            if (!isAuthenticated()) {
                location.href = getLoginUrl();
            } else {
                await logout();
                m.route.set("/");
            }
        };

        return (
            <nav class="flex justify-between px-4 items-center shadow-[0_5px_10px_0_rgb(0_0_0_/_15%)]">
                <Link href="/" class="font-bold text-2xl">
                    TWANG
                </Link>
                <button
                    class="outline-none transition-colors duration-300 ease-linear cursor-pointer hover:text-dracula-purple font-bold"
                    type="button" onclick={onClick}>
                    {isAuthenticated() ? "Logout" : "Login"}
                </button>
            </nav>
        );
    }
}
