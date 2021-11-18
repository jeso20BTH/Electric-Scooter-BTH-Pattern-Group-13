"use strict";

import m from 'mithril';

import userModel from './../models/user';

let index = {
    view: function() {
        return [
            m('h1', 'Historik'),
            m('table.table', [
                m('thead',
                    m('tr',
                        m('td', 'Datum'),
                        m('td', 'Restid'),
                        m('td', 'Kostnad'),
                        m('td', 'Betald')
                    )
                ),
                m('tbody', [
                    userModel.allHistory.map((history) => {
                        return m('tr', [
                            m('td', history.date),
                            m('td', history.duration),
                            m('td', `${history.price} SEK`),
                            m('td',
                                (history.paid) ?
                                    m('i.material-icons', 'check') :
                                    m('i.material-icons', 'clear')
                            )
                        ])
                    })
                ])
            ])
        ]
    }
};

export default index;
