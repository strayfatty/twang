import './Layout.css';
import * as m from 'mithril';

import { Auth } from 'Shared/Auth';
import { Twitch } from 'Shared/Twitch';

import { GameList } from 'Components/GameList';

export class Layout implements m.ClassComponent {
    showGames: boolean = false;

    view(vnode: m.Vnode) {
        const isAuthenticated = !!Auth.access_token();
        const authClass = isAuthenticated ? '.main--authenticated' : '';
        return m('.main' + authClass, [
            m('.main-navbar', [
                m('.main-title', 'TWANG'),
                m('button.main-login', {
                    onclick: () => {
                        window.location.href = Twitch.loginUrl();
                    }
                }, 'Log In'),
                m('button.main-games', {
                    onclick: () => this.showGames = true
                }, 'Followed Games'),
                m('button.main-logout', {
                    onclick: () => {
                        Twitch.revoke(Auth.access_token());
                        Auth.clear();
                    }
                }, 'Log Out')
            ]),
            m('.main-content', isAuthenticated ? vnode.children : []),
            this.showGames ? m(GameList, { onclose: () => { this.showGames = false; } }) : null
        ]);
    }
}