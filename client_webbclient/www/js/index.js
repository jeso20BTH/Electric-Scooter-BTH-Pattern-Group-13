"use strict";

import m from 'mithril';

import layout from './views/layout.js';
import index from './views/index.js';
import history from './views/history.js';
import user from './views/user.js';
import bankLayout from './views/bank_layout.js';
import bankIndex from './views/bank_index.js';
import bankAccount from './views/bank_account.js';
import bankTransfer from './views/bank_transfer.js';
import bankProccessing from './views/bank_proccessing.js';
import login from './views/login.js';


m.route(document.body, "/", {
    "/": {
        render: function(vnode) {
            return m(layout, m(index));
        }
    },
    "/history": {
        render: function(vnode) {
            return m(layout, m(history));
        }
    },
    "/user": {
        render: function(vnode) {
            return m(layout, m(user));
        }
    },
    "/bank": {
        render: function(vnode) {
            return m(bankLayout, m(bankIndex));
        }
    },
    "/bank/account": {
        render: function(vnode) {
            return m(bankLayout, m(bankAccount));
        }
    },
    "/bank/transfer": {
        render: function(vnode) {
            return m(bankLayout, m(bankTransfer));
        }
    },
    "/bank/proccessing": {
        render: function(vnode) {
            return m(bankProccessing);
        }
    },
    "/login": {
        render: function() {
            return m(layout, m(login));
        }
    }
});
