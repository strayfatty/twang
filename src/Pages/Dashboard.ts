import './Dashboard.css';
import * as m from 'mithril';

import { Following } from 'Components/Following';
import { Game } from 'Components/Game';
import { GameStore } from 'Shared/GameStore';

export class Dashboard implements m.Component {
    view() {
        const games = GameStore.getGames();

        return [
            m(Following),
            ...games.map(x => m(Game, { name: x }))
        ];
    }
}