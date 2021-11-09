"use strict";

import m from 'mithril';

import authModel from './../models/auth';

let login = {
    view: () => {
        return [
            m('div.flex.column.center.login-div',
                m('h1', 'Logga in'),
                m('button.display.flex.row.center.allign-center', {
                        onclick: authModel.login
                    }, [
                        m('p', 'Logga in med github'),
                        m('i.fab.fa-github')
                    ]
                )
            )
        ]
    }
}

export default login;
