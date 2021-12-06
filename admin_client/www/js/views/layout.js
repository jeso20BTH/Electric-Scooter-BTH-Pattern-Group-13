"use strict";

import m from 'mithril';

let layout = {
    view: function(vnode) {
        return [
            // m("nav.top-nav", "Infinity Warehouses lagerapp"),
            // m.route.get().split("/")[1] !== "news" ?
            //     m("span", [
            //         m("a.Btn", { href: "#!/" }, "Tillbaka till inleveranser")
            //     ]) : null,
            m("div", [
                m("a", { href: "#!/" }, "Byt stad "),
                m("a", { href: "#!/" }, "Visa laddstationer "),
                m("a", { href: "#!/" }, "Visa parkeringar "),
                m("a", { href: "#!/test" }, "Visa parkeringar ")

                    ]) ,
            
            m("main.container", vnode.children)
        ];
    }
};

export { layout };
