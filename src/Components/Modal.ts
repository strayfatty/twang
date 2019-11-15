import './Modal.css';
import * as m from 'mithril';

// see: https://github.com/spacejack/mithril-modal
let node: HTMLDivElement;
let content: HTMLDivElement;
let children: any;

const ModalContainer: m.Component = {
    view: () => children
}

export class Modal implements m.Component {
    oncreate(vnode: m.Vnode) {
        children = vnode.children;

        // Append a modal container to the end of body
        node = document.createElement('div');

         // The modal class has a fade-in animation
        node.className = 'modal';

        content = document.createElement('div');
        content.className = 'modal__frame'
        node.appendChild(content)

        document.body.appendChild(node);

        // Mount a separate VDOM tree here
        m.mount(content, ModalContainer);
    }

    onbeforeupdate(vnode: m.Vnode) {
        children = vnode.children;
    }

    onbeforeremove(vnode: m.Vnode) {
        // Add a class with fade-out exit animation
        node.classList.add('modal--hide');
        return new (<any>window).Promise((resolve: any) => {
            node.addEventListener('animationend', resolve);
        });
    }

    onremove() {
        // Destroy the modal dom tree. Using m.mount with
        // null triggers any modal children removal hooks.
        m.mount(content, null);
        document.body.removeChild(node);
    }

    view() { }
}