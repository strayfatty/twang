import "./Navigation.css";
import m from "mithril";
import { MithrilComponent } from "components/mithril-component";
import { getLoginUrl, isAuthenticated, logout } from "lib/twitch";

export class Navigation extends MithrilComponent {
    render() {
        const onClick = async () => {
            if (isAuthenticated()) {
                location.href = getLoginUrl();
            } else {
                await logout();
                location.href = "/"
            }
        };

        return (
            <nav>
                <a class="title" href="/">TWANG</a>
                <ul />
                <button onclick={onClick}>
                    {isAuthenticated() ? "Logout" : "Login"}
                </button>
            </nav>
        );
    }
}
