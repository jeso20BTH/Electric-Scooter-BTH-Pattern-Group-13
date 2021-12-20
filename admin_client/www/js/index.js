"use strict";
import m from 'mithril';
import { layout } from "./views/layout";
import list from "./views/list.js";
import mapviews from "./views/newmap";
import park from "./views/park.js";
import city from "./views/cities.js";
import move_bike from "./views/move_bike.js";
import omd from "./views/omdirigering.js";
import login from "./views/login.js";
import customers from "./views/customer.js";
import userModel from './models/user';



m.route(document.body, "/", {
    "/": {
        render: function() {
            return m(list);
        }
    },
    "/stader": {
        render: function() {
            console.log(userModel.authorized)
            console.log(userModel.currentUser)

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
    "/login": {
        render: function() {
            return m(layout, m(login),
            );
        }
    },
    "/success/:id": {
        onmatch: async function(args) {
            let userId = args.id
            
            await userModel.login(userId);
    
            userModel.authorized = true;
    
            m.route.set('/')
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