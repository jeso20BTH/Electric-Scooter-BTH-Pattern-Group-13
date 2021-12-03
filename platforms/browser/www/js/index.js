"use strict";

require("regenerator-runtime/runtime");

import m from 'mithril';

import userModel from './models/user';

import layout from './views/layout.js';
import index from './views/index.js';
import history from './views/history.js';
import user from './views/user.js';
import invoice from './views/invoice.js';
import ride from './views/ride.js';
import bankLayout from './views/bank_layout.js';
import bankIndex from './views/bank_index.js';
import bankAccount from './views/bank_account.js';
import bankTransfer from './views/bank_transfer.js';
import bankPay from './views/bank_Pay.js';
import bankProccessing from './views/bank_proccessing.js';
import login from './views/login.js';


m.route(document.body, "/", {
    "/": {
        render: function(vnode) {
            return m(layout, m(index));
        }
    },
    "/history": {
        onmatch: () => {
            if (userModel.authorized) {
                return history
            }

            m.route.set('/login')
        },
        render: function(vnode) {
            return m(layout, vnode);
        }
    },
    "/user": {
        onmatch: () => {
            if (userModel.authorized) {
                return user
            }

            m.route.set('/login')
        },
        render: function(vnode) {
            return m(layout, vnode);
        }
    },
    "/bank": {
        onmatch: () => {
            if (userModel.authorized) {
                return bankIndex
            }

            m.route.set('/login')
        },
        render: function(vnode) {
            return m(bankLayout, vnode);
        }
    },
    "/bank/account": {
        onmatch: () => {
            if (userModel.authorized) {
                return bankAccount
            }

            m.route.set('/login')
        },
        render: function(vnode) {
            return m(bankLayout, vnode);
        }
    },
    "/bank/transfer": {
        onmatch: () => {
            if (userModel.authorized) {
                return bankTransfer
            }

            m.route.set('/login')
        },
        render: function(vnode) {
            return m(bankLayout, vnode);
        }
    },
    "/invoice/:id": {
        onmatch: () => {
            if (userModel.authorized) {
                return invoice
            }

            m.route.set('/login')
        },
        render: function(vnode) {
            return m(layout, vnode);
        }
    },
    "/history/ride/:id": {
        onmatch: () => {
            if (userModel.authorized) {
                return ride
            }

            m.route.set('/login')
        },
        render: function(vnode) {
            return m(layout, vnode);
        }
    },
    "/bank/pay/:id": {
        onmatch: () => {
            if (userModel.authorized) {
                return bankPay
            }

            m.route.set('/login')
        },
        render: function(vnode) {
            return m(bankLayout, vnode);
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
    },
    "/success/:id": {
        onmatch: async (args) => {
            let userId = args.id
            console.log(userId);

            await userModel.login(userId);

            userModel.authorized = true;


            m.route.set('/')
        }
    },
});
