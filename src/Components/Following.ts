import * as m from 'mithril';

import { Twitch } from 'Shared/Twitch';
import { Stream } from 'Shared/TwitchApi';

import { StreamList } from 'Components/StreamList';

export class Following implements m.ClassComponent {
    promise: any;
    streams: Stream[] = null;
    
    view() {
        this.fetchStreams();

        return m(StreamList, {
            title: 'Following',
            href: 'https://www.twitch.tv/directory/following',
            streams: this.streams
        });
    }

    fetchStreams() {
        if (this.promise != null) {
            return;
        }

        this.promise = Twitch.getFollowedStreams()
            .then(response => this.streams = response);
    }
}