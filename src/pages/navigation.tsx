import m from "mithril";
import { Button } from "~/components/button";
import { Link } from "~/components/link";
import { MithrilComponent } from "~/components/mithril-component";
import { getLoginUrl, isAuthenticated, logout } from "~/lib/twitch";

export class Navigation extends MithrilComponent {
    render() {
        const onLogin = () => { location.href = getLoginUrl(); }
        const onLogout = async () => {
            await logout();
            m.route.set("/");
        }

        return (
            <nav class="flex items-center justify-between px-4 shadow-[0_5px_10px_0_rgb(0_0_0_/_15%)]">
                <Link href="/" class="font-bold text-2xl">
                    TWANG
                </Link>
                {isAuthenticated()
                ? <Button onclick={onLogout}>Logout</Button>
                : <Button onclick={onLogin}>Login</Button>}
            </nav>
        );
    }
}
