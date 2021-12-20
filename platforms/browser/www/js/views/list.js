"use strict";
import m from 'mithril';
import allCities from '../models/city';
import userModel from '../models/user';


let list = {
    view: function () {
        return m("main.container", [
            m("a", { href: `#!/stader` }, "Visa städer"),
            m("a", { href: `#!/login` }, "login"),
        ]);
    },
};


export default list;
