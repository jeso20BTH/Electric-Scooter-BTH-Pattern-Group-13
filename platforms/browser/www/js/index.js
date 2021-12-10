"use strict";
import m from 'mithril';
import { layout } from "./views/layout";
import list from "./views/list.js";
import mapviews from "./views/newmap";
import park from "./views/park.js";
import city from "./views/cities.js";
import move_bike from "./views/move_bike.js";
import omd from "./views/omdirigering.js";

import customers from "./views/customer.js";



m.route(document.body, "/", {
    "/": {
        render: function() {
            return m(list);
        }
    },
    "/stader": {
        render: function() {
            return m(city);
        }
    },
    "/karta:id": {
        render: function(vnode) {
            return m(layout, m(mapviews, vnode.attrs),
            );
        }
    },
    "/parkeringar": {
        render: function() {
            return m(layout, m(park),
            );
        }
    },
    "/flytt_cykel:id": {
        render: function(vnode) {
            return m(layout, m(omd, vnode.attrs),
            );
        }
    },
    "/kunder": {
        render: function() {
            return m(layout, m(customers),
            );
        }
    },
    "/cykel:id": {
        render: function(vnode) {
            return m(layout, m(move_bike, vnode.attrs),
            );
        }
    },
    
});