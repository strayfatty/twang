import './LoginResult.css';
import * as m from 'mithril';

import { Auth } from 'Shared/Auth';
import { Twitch } from 'Shared/Twitch';

export class LoginResult implements m.Component {
    view() {
        if (Auth.access_token()) {
            Twitch.revoke(Auth.access_token());
        }

        Auth.clear();

        const index = window.location.href.lastIndexOf('#');
        const queryString = window.location.href.substring(index + 1);

        const resonse: any = m.parseQueryString(queryString);
        Auth.access_token(resonse.access_token);

        m.route.set('/');
        return <any>[];
    }
}