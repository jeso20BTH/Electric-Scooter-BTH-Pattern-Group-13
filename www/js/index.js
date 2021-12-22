"use strict";
import m from 'mithril';
import { layout } from "./views/layout";
import mapviews from "./views/newmap";
import park from "./views/park.js";
import city from "./views/cities.js";
import move_bike from "./views/move_bike.js";
import omd from "./views/omdirigering.js";
import login from "./views/login.js";
import customers from "./views/customer.js";
import kund from "./views/kund.js";
import userModel from './models/user';
import kundModel from './models/kund';



m.route(document.body, "/", {
    "/": {
        render: function() {
            return m(login);
        }
    },
    "/stader": {
        render: function() {
            if (userModel.authorized == true) {
                return m(city)
            }
            m.route.set('/')
        },
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
            return m(omd, vnode.attrs);
        }
    },
    "/kunder": {
        render: function() {
            return m(layout, m(customers),
            );
        }
    },
    "/kunder:id": {
        onmatch: async function(args) {
            let kundId = (args.id).substring(1)
            await kundModel.getKund(kundId);
        },
        render: function() {
            return m(layout, m(kund),
            );
        }
    },
    "/cykel:id": {
        render: function(vnode) {
            return m(layout, m(move_bike, vnode.attrs),
            );
        }
    },
    "/success/:id": {
        onmatch: async function(args) {
            let userId = args.id
            
            await userModel.login(userId);
    
            m.route.set('/stader')
        }
    },
    "/logout": {
        onmatch: async function(args) {
            userModel.authorized = false;
            userModel.currentUser = {};
    
            m.route.set('/')
        }
    }
});