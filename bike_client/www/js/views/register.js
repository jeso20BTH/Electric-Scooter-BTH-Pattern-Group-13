import m from 'mithril';

import { auth } from "../models/auth.js";

let register = {
    view: function() {
        return m("div.container",
            m("h2", "Register"),
            m("p", "Please enter your email and password."),
            m("p", {class: "text-danger"}, auth.message),
            m("form", {
                onsubmit: function(event) {
                    event.preventDefault();
                    auth.register();
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
                m("input.button.green-button[type=submit][value=Register].button", "Register")
            ]));
    }
};

export { register };
