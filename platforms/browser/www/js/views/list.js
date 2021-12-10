"use strict";
import m from 'mithril';
import allCities from '../models/city';



let list = {
    view: function () {
        return m("main.container", [
            m("a", { href: `#!/stader` }, "Visa städer"),
        ]);
    },
};

export default list;
