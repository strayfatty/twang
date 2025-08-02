import "./Navigation.css";
import { MithrilComponent } from "components/mithril-component";
import { getLoginUrl, isAuthenticated, logout } from "lib/twitch";
import m from "mithril";

export class Navigation extends MithrilComponent {
    render() {
        const onClick = async () => {
            if (!isAuthenticated()) {
                location.href = getLoginUrl();
            } else {
                await logout();
                location.href = "/";
            }
        };

        return (
            <nav>
                <a class="title" href="/">
                    TWANG
                </a>
                <ul />
                <button type="button" onclick={onClick}>
                    {isAuthenticated() ? "Logout" : "Login"}
                </button>
            </nav>
        );
    }
}
