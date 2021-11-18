"use strict";

import m from "mithril";

var layout = {
    links: [
        { name: "Home", route: "#!/"},
        { name: "Map", route: "#!/map" },
    ],
    view: function(vnode) {
        var topNav = vnode.attrs.topNav;
        var bottomNav = vnode.attrs.bottomNav;

        return [
            m("nav.top-nav", { textContent: "Bike App"}, [
                topNav ? m("span", [
                    m("a", { href: topNav.route }, topNav.title)
                ]) : null
            ]),
            m("main.container", vnode.children),
            m("nav.bottom-nav", layout.links.map(function(link) {
                return m("a", {
                    href: link.route,
                    class: bottomNav === link.route ? "active" : null
                }, link.name);
            }))
        ];
    }
};

export { layout };
