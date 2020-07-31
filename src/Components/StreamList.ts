import './StreamList.css';
import * as m from 'mithril';

import { Loader } from 'Components/Loader';
import { StreamCard } from 'Components/StreamCard';

interface StreamListAttrs {
    title: string,
    href: string,
    streams: any[]
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
                m('.stream-list__loader', m(Loader)),
                m('.stream-list__empty', 'no streams found')
            ]),
            m('.stream-list__content', (streams || []).map(x => m(StreamCard, x)))
        ])
    }
}