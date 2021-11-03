"use strict";

import m from 'mithril';

// let offlineNav = {
//
//     view: function () {
//         return [
//             layout.offlineElements.map(function (element) {
//                 let route = m.route.get();
//
//                 route = (route) ? route : "/";
//
//                 let object = "a.flex.column.center.align-center.phone.offline";
//
//                 if (element.ref !== route) {
//                     object += ".inactive";
//                 }
//
//                 return [
//                     m(object, { href: `#!${element.ref}` }, [
//                         m(`img.icon`, {src: `img/icons/black_${element.img}`}),
//                         m(`span.icon-text`, element.name)
//                     ])
//                 ];
//             })
//         ];
//     }
// };
//
// let onlineNav = {
//     view: function () {
//         return [
//             m("a.no-padding.phone",
//                 {
//                     onclick: function() {
//                         if (
//                             layout.drawerStatus === "gone"
//                             || layout.drawerStatus === "start-drawer"
//                         ) {
//                             layout.drawerStatus = "";
//                         } else if (layout.drawerStatus === "") {
//                             layout.drawerStatus = "gone";
//                         }
//                     }
//                 },
//                 m(`i.material-icons`, "menu")
//             ),
//             m("div.flex.row.end.width-half.phone", [
//                 layout.actionElements.map(function (element) {
//                     return [
//                         m("a", { href: `#!${element.ref}` }, [
//                             m(`i.material-icons`, element.class)
//                         ])
//                     ];
//                 })
//             ])
//         ];
//     }
// };
//
// let offlineDrawer = {
//     view: function() {
//         return [
//             layout.offlineElements.map(function (element) {
//                 let route = m.route.get();
//
//                 route = (route) ? route : "/";
//                 let object = "a.flex.column.center";
//
//                 if (element.ref === route) {
//                     object += ".active";
//                 }
//                 return [
//                     m(object, {
//                         onclick: function() {
//                             layout.drawerStatus = "gone";
//                             m.route.set(element.ref);
//                         }
//                     }, m("div.flex.row.start.align-center", [
//                         m(`img.icon`, {src: `img/icons/black_${element.img}`}),
//                         m("span.icon-text", element.name)
//                     ]))
//                 ];
//             })
//         ];
//     }
// };
//
// let onlineDrawer = {
//     view: function() {
//         return [
//             layout.drawerElements.map(function (element) {
//                 let route = m.route.get();
//                 let object = "a.flex.column.center";
//
//                 route = (route) ? route : "/";
//
//                 if (element.ref === route) {
//                     object += ".active";
//                 }
//                 return [
//                     m(object, {
//                         onclick: function() {
//                             layout.drawerStatus = "gone";
//                             m.route.set(element.ref);
//                         }
//                     }, m("div.flex.row.start.align-center", [
//                         m(`i.material-icons`, element.class),
//                         m("span.icon-text", element.name)
//                     ]))
//                 ];
//             })
//         ];
//     }
// };

let layout = {
    navElements: [
        {
            online: [
                {name: "Hem", class: "home", ref: "/"},
                {name: "Karta", class: "map", ref: "/map"},
                {name: "Favoriter", class: "lock", ref: "/favorites"}
            ],
            offline: [
                {name: "Hem", img: "home", ref: "/"},
                {name: "Förseningar", img: "train", ref: "/delays"}
            ]
        }


    ],
    drawerStatus: "start-drawer",
    animationClass: "",
    view: function(vnode) {
        return [
            m('nav.flex.row.between.nav', [
                (screen.width > 667) ? m("div.flex.column.center",
                    m("p.site-header", "TRAFIKINFO")
                ) : "",
                (screen.width > 667) ? m("div.flex.row.end", [
                    layout.navElements.map(function (elements) {
                        if (navigator.onLine) {
                            return elements.online.map(function (element) {
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
                            });
                        } else if (!navigator.onLine) {
                            return elements.offline.map(function (element) {
                                let route = m.route.get();

                                route = (route) ? route : "/";

                                let object = "a.flex.column.center.offline";

                                if (element.ref === route) {
                                    object += ".active";
                                }

                                return [
                                    m(object, { href: `#!${element.ref}` }, [
                                        m("div.flex.row.center",
                                            m(`img.icon`, {src: `img/icons/${element.img}.png`})
                                        ),
                                        m("span.nav-text", element.name)
                                    ])
                                ];
                            });
                        }
                    })
                ]) :
                    layout.navElements.map(function (elements) {
                        if (navigator.onLine) {
                            return elements.online.map(function (element) {
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
                            });
                        } else if (!navigator.onLine) {
                            return elements.offline.map(function (element) {
                                let route = m.route.get();

                                route = (route) ? route : "/";

                                let object = "a.flex.column.center.offline";

                                if (element.ref === route) {
                                    object += ".active";
                                }

                                return [
                                    m(object, { href: `#!${element.ref}` }, [
                                        m("div.flex.row.center",
                                            m(`img.icon`, {src: `img/icons/${element.img}.png`})
                                        ),
                                        m("span.nav-text", element.name)
                                    ])
                                ];
                            });
                        }
                    })
            ]),
            m(`main.container.${layout.animationClass}`, {
                // onclick: function() {
                //     if (layout.drawerStatus === "") {
                //         layout.drawerStatus = "gone";
                //         m.route.set(m.route.get());
                //     }
                //     console.log("container");
                // }
            }, vnode.children)
        ];
    }
};

export default layout;
