"use strict";

import m from 'mithril';

let index = {
    view: function() {
        return [
            m('h1', 'Användare'),
            m('fieldset.flex.column.start.allign-center', [
                m('legend', 'Info'),
                m('p', 'John Doe'),
                m('p', 'john.doe@john.doe'),
                m('p', '070 - 123 45 67'),
            ]),
            m('fieldset.flex.column.start.allign-center', [
                m('legend', 'Betalning'),
                m('div.flex.row.start', [
                    m('p', 'Balans: 666 SEK'),
                    m('button', 'Fyll på')
                ]),
                m('div.flex.row.start', [
                    m('p', 'Betalningmetod: Direkt'),
                    m('button', 'Ärdra')
                ])
            ])
        ]
    }
};

export default index;
