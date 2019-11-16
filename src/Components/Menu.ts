import './Menu.css';
import * as m from 'mithril';

import { Auth } from 'Shared/Auth';
import { Model } from 'Shared/Model';
import { Twitch } from 'Shared/Twitch';
import { User } from 'Shared/TwitchApi';

import { GameList } from 'Components/GameList';

export class Menu implements m.ClassComponent {
    showMenu: boolean = false;
    showGames: boolean = false;

    view() {
        const user: User = Model.getCurrentUser() || { };

        return m('.menu', [
            m('button.menu__button', {
                onclick: () => { this.showMenu = !this.showMenu; }
            }, [
                m('img.menu__avatar', {
                    alt: user.displayName,
                    src: user.profileImageUrl
                })
            ]),
            !this.showMenu ? null : m('.menu__list', [
                m('button.menu__item', {
                    onclick: () => {
                        this.showMenu = false;
                        this.showGames = true;
                    }
                }, 'Followed Games'),
                m('button.menu__item', {
                    onclick: () => {
                        Twitch.revoke(Auth.access_token());
                        Auth.clear();
                    }
                }, 'Log Out')
            ]),
            this.showGames ? m(GameList, { onclose: () => { this.showGames = false; } }) : null
        ]);
    }
}