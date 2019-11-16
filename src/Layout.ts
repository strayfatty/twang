import './Layout.css';
import * as m from 'mithril';

import { Auth } from 'Shared/Auth';
import { Twitch } from 'Shared/Twitch';

import { Menu } from 'Components/Menu';

export class Layout implements m.ClassComponent {
    view(vnode: m.Vnode) {
        const isAuthenticated = !!Auth.access_token();
        const authClass = isAuthenticated ? '.main--authenticated' : '';
        return m('.main' + authClass, [
            m('.main-navbar', [
                m('.main-title', 'TWANG'),
                isAuthenticated
                    ? m('.main-menu', m(Menu))
                    : m('button.main-login', {
                        onclick: () => {
                            window.location.href = Twitch.loginUrl();
                        }
                    }, 'Log In')
            ]),
            m('.main-content', isAuthenticated ? vnode.children : []),
        ]);
    }
}