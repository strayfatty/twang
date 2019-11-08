import './StreamCard.css';
import * as m from 'mithril';

import { Stream } from 'Shared/TwitchApi';

export class StreamCard implements m.Component<Stream> {
    view(vnode: m.Vnode<Stream>) {
        const stream = vnode.attrs;
        if (!stream.id) {
            return m('.stream-card.stream-card--blank');
        }

        return m('.stream-card', [
            m('.stream-card__preview', [
                m('img.stream-card__thumbnail', {
                    alt: stream.title,
                    src: thumbnailUrl(stream.thumbnailUrl)
                })
            ]),
            m('.stream-card__user', [
                m('img.stream-card__user-logo', {
                    src: stream.userLogo
                }),
                m('.stream-card__user-text', [
                    m('a.stream-card__user-name', {
                        href: stream.url,
                        target: '_blank'
                    }, stream.userName),
                    m('.stream-card__viewers', stream.viewers + ' viewers')
                ])
            ]),
            m('.stream-card__game', { title: stream.gameName }, stream.gameName),
            m('.stream-card__title', { title: stream.title }, stream.title)
        ])
    }
}

function thumbnailUrl(template: string): string {
    return (template || '')
        .replace(/{width}/, '320')
        .replace(/{height}/, '180');
}