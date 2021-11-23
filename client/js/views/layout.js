"use strict";

import m from 'mithril';

import userModel from './../models/user';

let layout = {
    navElements: [
            {name: "Hem", class: "home", ref: "/"},
            {name: "Historik", class: "electric_scooter", ref: "/history"},
            {name: "Konto", class: "person", ref: "/user"}
    ],
    loginNavElements: [{name: "Logga in", class: "lock", ref: "/login"}],
    view: function(vnode) {
        let navElements = (userModel.authorized) ? layout.navElements : layout.loginNavElements;
        return [
            m('header.flex.row.between.header', [
                m('img.hero-img', {
                        src: 'img/hero_image.jpg'
                    }
                ),
                m('div.flex.column.center', [
                    m('a.site-title', {
                            href: '#!/'
                        },
                        [
                            m('p.site-title-text', 'ELEKTRISKA'),
                            m('p.site-title-text', 'SCOOTERS')
                        ]

                    ),
                ]),
                m('div.flex.column.end', [
                    m('nav.flex.row.end.nav', [
                        navElements.map(function (element) {
                            let route = m.route.get();

                            route = (route) ? route : "/";

                            let object = "a.flex.column.end.allign-center";

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
                    ])
                ])
            ]),
            m(`main.container`, vnode.children)
        ];
    }
};

export default layout;
