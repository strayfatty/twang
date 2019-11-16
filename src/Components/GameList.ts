import './GameList.css';
import * as m from 'mithril';

import { Model } from 'Shared/Model';
import { Game } from 'Shared/TwitchApi';

import { Trash } from 'Icons/Solid/Trash';

import { GameSearch } from 'Components/GameSearch';
import { Modal } from 'Components/Modal';

interface GameListAttrs {
    onclose: () => void;
}

export class GameList implements m.ClassComponent<GameListAttrs> {
    games: string[];

    oninit() {
        this.games = Model.getGames();
    }

    view(vnode: m.Vnode<GameListAttrs>) {
        return m(Modal, [
            m('.modal__header', 'Followed Games'),
            m('.modal__content', [
                m(GameSearch, {
                    class: 'game-list__search',
                    onselect: (game: Game) => this.add(game)
                }),
                m('.game-list', ...this.games.map(x => this.item(x)))
            ]),
            m('.modal__footer', [
                m('button.modal__button', {
                    onclick: () => {
                        Model.setGames(this.games);
                        vnode.attrs.onclose();
                    }
                }, 'Save'),
                m('button.modal__button', {
                    onclick: vnode.attrs.onclose
                }, 'Cancel')
            ])
        ]);
    }

    item(name: string) {
        return m('.game-list__item', [
            m('.game-list__name', {
                title: name
            }, name),
            m('button.game-list__remove', {
                onclick: () => this.remove(name)
            }, m(Trash))
        ])
    }

    add(game: Game) {
        const index = this.games.indexOf(game.name);
        if (index !== -1) {
            return;
        }

        this.games.push(game.name);
        this.games.sort((a, b) => (a || '').localeCompare(b, 'en', { numeric: true }));
    }

    remove(name: string) {
        const index = this.games.indexOf(name);
        this.games.splice(index, 1);
    }
}