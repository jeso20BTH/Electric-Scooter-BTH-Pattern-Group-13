"use strict";

import m from 'mithril';

let index = {
    view: function() {
        return [
            m('h1', 'Historik'),
            m('table', [
                m('thead',
                    m('tr',
                        m('td', 'Datum'),
                        m('td', 'Restid'),
                        m('td', 'Kostnad'),
                        m('td', 'Betald')
                    )
                ),
                m('tbody', [
                    m('tr', [
                        m('td', '2021-11-09 13:37:00'),
                        m('td', '00:23:54'),
                        m('td', '47 SEK'),
                        m('td',
                            m('i.material-icons', 'check')
                        )
                    ]),
                    m('tr', [
                        m('td', '2021-11-09 13:37:00'),
                        m('td', '00:23:54'),
                        m('td', '47 SEK'),
                        m('td',
                            m('i.material-icons', 'clear')
                        )
                    ])
                ])
            ])
        ]
    }
};

export default index;
