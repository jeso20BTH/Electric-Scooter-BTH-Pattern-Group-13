"use strict";

import m from 'mithril';
import allCities from '../models/city';


let layout = {
    view: function(vnode) {
        return [
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

// m.route.get().split("/")[1] == "karta:2" ?
//                     m("span", [
                        
//                     ]) : m("span", [
//                         m("a", { href: "#!/" }, "Logout "),
//                         m("a", { href: "#!/stader" }, "Byt stad "),
//                         m("a", { href: `#!/karta:${allCities.cityId}` }, "Visa laddstationer "),
//                         m("a", { href: `#!/parkeringar` }, "Visa parkeringar "),
//                         m("a", { href: "#!/kunder" }, "Visa kunder "),
//                     ]) 
//                 ]),