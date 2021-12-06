"use strict";
import m from 'mithril';
import { layout } from "./views/layout";
import list from "./views/list.js";
import mapviews from "./views/newmap";
import form from "./views/form.js";
import city from "./views/cities.js";
import test from "./views/test.js";


m.route(document.body, "/", {
    "/": {
        render: function() {
            return m(city);
        }
    },
    "/map": {
        render: function() {
            return m(layout, m(mapviews),
            );
        }
    },
    "/form": {
        render: function() {
            return m(layout, m(form, {name: "Floyd"}),
            );
        }
    },
    "/test": {
        render: function() {
            return m(layout, m(test),
            );
        }
    },
    "/cities": {
        render: function() {
            return m(layout, m(list),
                m("nav.bottom-nav", [
                    m("a.active", { href: "#!/cities" }, "Trafikinfo"),
                    m("a", { href: "#!/" }, "Byt stad"),
                    m("a", { href: "#!/map" }, "new")
                ]),
            );
        }
    }
});

