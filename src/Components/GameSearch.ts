import * as m from 'mithril';

import { Twitch } from 'Shared/Twitch';
import { Game } from 'Shared/TwitchApi';

import { Autocomplete } from 'Components/Autocomplete';

interface GameSearchAttrs {
    class?: string;
    onselect: (game: Game) => void;
}

export class GameSearch implements m.ClassComponent<GameSearchAttrs> {
    view(vnode: m.Vnode<GameSearchAttrs>) {
        return m(Autocomplete, {
            class: vnode.attrs.class,
            
            onchange: vnode.attrs.onselect,

            displayName: displayName,
            renderItem: renderCountry,
            search: search
        })
    }
}

function displayName(game: Game): string {
    if (!game) {
        return '';
    }

    return game.name;
}

function renderCountry(game: Game, filter: string): m.Children {
    return displayName(game);
}

function search(filter: string): Promise<Game[]> {
    return Twitch.searchGames(filter);
}