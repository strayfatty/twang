import * as m from 'mithril';

import { Twitch } from 'Shared/Twitch';
import { Stream } from 'Shared/TwitchApi';

import { StreamList } from 'Components/StreamList';

interface GameAttrs {
    name: string;
}

export class Game implements m.ClassComponent<GameAttrs> {
    promise: any;
    name: string;
    streams: Stream[] = null;

    view(vnode: m.Vnode<GameAttrs>) {
        if (this.name != vnode.attrs.name) {
            this.promise = null;
            this.name = vnode.attrs.name;
            this.streams = null;
        }

        this.fetchStreams();

        return m(StreamList, {
            title: this.name,
            href: 'https://www.twitch.tv/directory/game/' + encodeURIComponent(this.name),
            streams: this.streams
        });
    }

    fetchStreams() {
        if (this.promise != null) {
            return;
        }

        this.promise = Twitch.getGameStreams(this.name)
            .then(response => this.streams = response);
    }
}