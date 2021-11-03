"use strict";

import m from 'mithril';

let layout = {
    navElements: [
            {name: "Hem", class: "home", ref: "/"},
            {name: "Karta", class: "map", ref: "/map"},
            {name: "Favoriter", class: "lock", ref: "/favorites"}
    ],
    view: function(vnode) {
        return [
            m('nav.flex.row.between.nav', [
                layout.navElements.map(function (element) {
                    let route = m.route.get();

                    route = (route) ? route : "/";

                    let object = "a.flex.column.center";

                    if (element.ref === route) {
                        object += ".active";
                    }

                    return [
                        m(object, { href: `#!${element.ref}` }, [
                            m(`i.material-icons`, element.class),
                            m("span.nav-text", element.name)
                        ])
                    ];
                })
            ]),
            m(`main.container`, vnode.children)
        ];
    }
};

export default layout;
