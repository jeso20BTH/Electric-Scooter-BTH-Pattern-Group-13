"use strict";

import m from 'mithril';

let layout = {
    navElements: [
            {name: "Hem",  ref: "/bank/"},
            {name: "Konton", ref: "/bank/account"},
            {name: "Överföring", ref: "/bank/transfer"}
    ],
    view: function(vnode) {
        return [
            m('header.bank-header', [
                m('div.flex.row.start', [
                    m('a.flex.column.center.site-title', {
                            href: '#!/bank'
                        },
                        [
                            m('p.site-title-text', 'FALSKA BANK'),
                            m('p.site-slogan', 'Din otrygghet är vår ledstjärna')
                        ]
                    ),
                ]),
                m('div.flex.column.end', [
                    m('nav.flex.row.center.nav', [
                        layout.navElements.map(function (element) {
                            let route = m.route.get();

                            route = (route) ? route : "/";

                            let object = "a.flex.column.end.allign-center";

                            if (element.ref === route) {
                                object += ".active";
                            }

                            return [
                                m(object, { href: `#!${element.ref}` }, [
                                    m("span.nav-text", element.name)
                                ])
                            ];
                        })
                    ])
                ])
            ]),
            m('div.body', m(`main.bank-container`, vnode.children)),
            m('footer.flex.row.center.allign-center.bank-footer', [
                m('p', '© Skumma affärer sedan 2021')
            ])
        ];
    }
};

export default layout;
