import './Dashboard.css';
import * as m from 'mithril';

import { Model } from 'Shared/Model';

import { StreamList } from 'Components/StreamList';

export class Dashboard implements m.Component {
    view() {
        const games = Model.getGames();
        return [
            following(),
            ...games.map(name => game(name))
        ];
    }
}

function following() {
    return m(StreamList, {
        title: 'Following',
        href: 'https://www.twitch.tv/directory/following',
        streams: Model.getFollowedStreams()
    });
}

function game(name: string) {
    return m(StreamList, {
        title: name,
        href: 'https://www.twitch.tv/directory/game/' + encodeURIComponent(name),
        streams: Model.getGameStreams(name)
    });
}