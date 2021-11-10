"use strict";

import m from 'mithril';

import layout from './views/layout.js';
import index from './views/index.js';
import history from './views/history.js';
import user from './views/user.js';
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
    "/login": {
        render: function() {
            return m(layout, m(login));
        }
    }
});
