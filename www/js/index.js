"use strict";

import m from 'mithril';

import authModel from './models/auth';

import layout from './views/layout.js';
import index from './views/index.js';
import map from './views/map.js';
import login from './views/login.js';
import user from './views/user.js';

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    m.route(document.body, "/", {
        "/": {
            onmatch: function() {
                if (authModel.authorized) {
                    return index;
                }
                return m.route.set("/login");
            },
            render: function(vnode) {
                return m(layout, vnode);
            }
        },
        "/map": {
            onmatch: function() {
                if (authModel.authorized) {
                    return map;
                }
                return m.route.set("/login");
            },
            render: function(vnode) {
                return m(layout, vnode);
            }
        },
        "/user": {
            onmatch: function() {
                if (authModel.authorized) {
                    return user;
                }
                return m.route.set("/login");
            },
            render: function(vnode) {
                return m(layout, vnode);
            }
        },
        "/login": {
            render: function() {
                return m(layout, m(login));
            }
        }
    });
}
