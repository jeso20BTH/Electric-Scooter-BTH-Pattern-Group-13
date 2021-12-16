"use strict";

import m from 'mithril';
import userModel from '../models/user';
import allCities from '../models/city';


let layout = {
    view: function(vnode) {
        return [
            m("h3", userModel.currentUser),
            m("div.navbar", [
                m("a", { href: `#!/karta:${allCities.cityId}` }, "Visa kartvy"),
                m("a", { href: "#!/kunder" }, "Visa kunder "),
                m("a", { href: "#!/stader" }, "Byt stad "),
                m("a.off", { href: "#!/logout" }, "Logout "),
            ]),
            m("main.container", vnode.children)
        ];
    }
};

export { layout };
