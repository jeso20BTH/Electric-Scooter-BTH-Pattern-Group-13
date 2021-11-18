"use strict";

import m from 'mithril';

let bank = {
    view: function() {
        return [
            m('h1', 'Välkommen'),
            m('p', `Stämmer något av nedan påstående för dig, då är vi banken för dig!`),
            m('ul', [
                m('li', 'Du har för mycket pengar'),
                m('li', 'Du tycker om att bli lurad'),
                m('li', 'Du brukar svara på mail från sydafrikanska prinsar.')
            ]),
            m('p', 'Vad väntar du på, vi finns här för dig!')
        ]
    }
};

export default bank;
