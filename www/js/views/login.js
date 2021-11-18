import m from 'mithril';

import { auth } from "../models/auth.js";

let login = {
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function(resolve) {
            setTimeout(function() {
                vnode.dom.classList.remove("slide-out");
                resolve();
            }, 250);
        });
    },
    view: function() {
        return m("div.container.slide-in",
            m("h2", "Log in"),
            m("a", {href: "#!/register", class: "button"}, "Register"),
            m("p", {class: "text-danger"}, auth.message),
            m("form", {
                onsubmit: function(event) {
                    event.preventDefault();
                    auth.login();
                } }, [
                m("label.input-label", "E-mail"),
                m("input.input[type=email][placeholder=E-mail]", {
                    oninput: function (e) {
                        auth.email = e.target.value;
                    },
                    value: auth.email
                }),
                m("label.input-label", "Password"),
                m("input.input[type=password][placeholder=Password]", {
                    oninput: function (e) {
                        auth.password = e.target.value;
                    },
                    value: auth.password
                }),
                m("input.button.green-button[type=submit][value=Log in].button", "Log in")
            ]));
    }
};

export { login };
