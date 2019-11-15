import './StreamList.css';
import * as m from 'mithril';

import { Trash } from 'Icons/Solid/Trash';

import { Loader } from 'Components/Loader';
import { StreamCard } from 'Components/StreamCard';

// import { TwitchStream } from 'Shared/Twitch';

interface StreamListAttrs {
    title: string,
    href: string,
    streams: any[]

    ondelete?: () => void;
}

export class StreamList implements m.Component<StreamListAttrs> {
    view(vnode: m.Vnode<StreamListAttrs>) {
        const streams = vnode.attrs.streams;
        const loading = streams == null;
        const empty = !loading && streams.length === 0;
        const modifiers = loading ? 'stream-list--loading' : (empty ? 'stream-list--empty' : '');

        return m('.stream-list', { class: modifiers }, [
            m('.stream-list__header', [
                m('a.stream-list__title', {
                    href: vnode.attrs.href,
                    target: '_blank'
                }, vnode.attrs.title),
                vnode.attrs.ondelete ? m('button.stream-list__remove', {
                    onclick: vnode.attrs.ondelete
                }, m(Trash)) : null,
                m('.stream-list__loader', m(Loader)),
                m('.stream-list__empty', 'no streams found')
            ]),
            m('.stream-list__content', [
                ...(streams || []).map(x => m(StreamCard, x)),
                m(StreamCard, null),
                m(StreamCard, null),
                m(StreamCard, null),
                m(StreamCard, null),
                m(StreamCard, null),
                m(StreamCard, null),
            ])
        ])
    }


}