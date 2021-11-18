"use strict";

import m from 'mithril';

import { layout } from "./views/layout.js";

import { homeView } from "./views/home.js";

import { mapView } from "./views/map.js";

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    m.route(document.body, "/", {
        "/": {
            onmatch: function() {
                return homeView;
            },
            render: function() {
                return m(layout, {
                    bottomNav: "#!/"
                }, m(homeView));
            }
        },
        "/map": {
            render: function() {
                return m(layout, {
                    bottomNav: "#!/map"
                }, m(mapView));
            }
        }
    });
}
