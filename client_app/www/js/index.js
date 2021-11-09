"use strict";

import m from 'mithril';

import layout from './views/layout.js';
import index from './views/index.js';
import map from './views/map.js';
import login from './views/login.js';

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    m.route(document.body, "/", {
        "/": {
            render: function() {
                return m(layout, m(index));
            }
        },
        "/map": {
            render: function() {
                return m(layout, m(map));
            }
        },
        "/login": {
            render: function() {
                return m(layout, m(login));
            }
        }
    });
}
