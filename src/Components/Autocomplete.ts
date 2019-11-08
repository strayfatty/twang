import './Autocomplete.css';
import * as m from 'mithril';

import { debounce } from 'Shared/Debounce';

export interface AutocompleteAttrs {
    class?: string,
    disabled?: boolean;
    selectOnBlur?: boolean;

    value?: any;

    onchange: (item: any) => void;

    displayName: (item: any) => string;
    renderItem: (item: any, filter: string) => m.Children;
    search: (filter: string) => Promise<any[]>;
}

export class Autocomplete implements m.ClassComponent<AutocompleteAttrs> {
    filter: string = '';
    showSuggestions: boolean = false;
    selectedIndex: number = 0;
    items: any[] = [];
    callIndex: number = 0;

    delayedSearch: () => void;

    oninit(vnode: m.Vnode<AutocompleteAttrs>) {
        this.delayedSearch = debounce(() => {
            this.triggerSearch(vnode);
        }, 150);
    }

    view(vnode: m.Vnode<AutocompleteAttrs>) {
        return m('div', {
            class: 'autocomplete ' + (vnode.attrs.class || ''),
        }, [
            this.renderInput(vnode),
            this.renderSuggestions(vnode)
        ]);
    }

    renderInput(vnode: m.Vnode<AutocompleteAttrs>) {
        if (!this.showSuggestions) {
            this.filter = vnode.attrs.displayName(vnode.attrs.value);
        }

        return m('input', {
            class: 'autocomplete__input',
            disabled: vnode.attrs.disabled,
            value: this.filter,
            placeholder: 'add game',
            onfocus: () => { this.triggerSearch(vnode); },
            onblur: () => {
                const selectOnBlur = vnode.attrs.selectOnBlur !== false;
                if (this.showSuggestions && selectOnBlur) {
                    this.selectCurrent(vnode);
                }

                this.showSuggestions = false;
            },

            oninput: (event: Event) => {
                this.filter = (<any>event.srcElement).value;
                this.delayedSearch();
                (<any>event).redraw = false;
            },
            onkeydown: (event: KeyboardEvent) => this.keydown(event, vnode),
            onchange: (event: Event) => this.selectCurrent(vnode)
        });
    }

    renderSuggestions(vnode: m.Vnode<AutocompleteAttrs>): any {
        if (!this.showSuggestions || this.items.length === 0) {
            return null;
        }

        const suggestions: any[] = [];

        this.items.forEach((item, index) => {
            var cssClass = 'autocomplete__suggestion';
            if (index === this.selectedIndex) {
                cssClass += ' autocomplete__suggestion-active';
            }

            suggestions.push(m('div', {
                class: cssClass,
                onmousedown: (event: Event) => {
                    // prevent default onmousedown. if not prevented
                    // onblur will be called on the input before onclick,
                    // which in turn will close the drop down and onclick
                    // will not fire
                    event.preventDefault();
                },
                onclick: () => {
                    this.selectedIndex = index;
                    this.selectCurrent(vnode);
                }
            }, vnode.attrs.renderItem(item, this.filter)));
        });

        return m('div', {
            class: 'autocomplete__suggestions'
        }, suggestions);
    }

    keydown(event: KeyboardEvent, vnode: m.Vnode<AutocompleteAttrs>) {
        // Escape (27)
        if (event.keyCode === 27) {
            this.filter = vnode.attrs.displayName(vnode.attrs.value);
            this.showSuggestions = false;
            return;
        }

        // Enter (13)
        if (event.keyCode === 13) {
            var changeEvent = document.createEvent('HTMLEvents');
            changeEvent.initEvent('change', false, true);
            event.target.dispatchEvent(changeEvent);
        }

        // down (40)
        if (event.keyCode === 40) {
            if (!this.showSuggestions) {
                this.triggerSearch(vnode);
                return;
            }

            this.selectedIndex++;
            if (this.selectedIndex >= this.items.length) {
                this.selectedIndex = 0;
            }

            return;
        }
        
        // up (38)
        if (event.keyCode === 38) {
            this.selectedIndex--;
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.items.length - 1;
            }

            return;
        }

        (<any>event).redraw = false;
    }

    triggerSearch(vnode: m.Vnode<AutocompleteAttrs>) {
        if (!this.filter) {
            return;
        }

        const callIndex = this.callIndex++;
        this.callIndex = callIndex;

        vnode.attrs.search(this.filter)
            .then(items => {
                if (callIndex !== this.callIndex) {
                    return;
                }

                this.selectedIndex = 0;
                this.items = items;
                this.showSuggestions = true;
            });
    }

    selectCurrent(vnode: m.Vnode<AutocompleteAttrs>) {
        if (!this.showSuggestions) {
            return;
        }

        let current = null;
        if (this.selectedIndex < this.items.length) {
            current = this.items[this.selectedIndex];
        }

        this.showSuggestions = false;
        this.selectedIndex = 0;
        this.items = [];

        vnode.attrs.onchange(current);
        this.filter = vnode.attrs.displayName(current);
    }
}