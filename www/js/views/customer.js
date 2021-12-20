"use strict";
import m from 'mithril';
import allCities from '../models/city';
import allCustomers from '../models/customers';

let kund;
let open;
let text;

let kunder = {
    oninit: (async () => {
        kund = await allCustomers
    })(),
    view: function () {
        let count = 0;
        open == 1 ? [
            text = "Stäng alla kunder"
        ] : text = "Bläddra bland alla kunder";
        return m("main.container", [
            m("h1", "Kunder hos Svenska Elsparkcyklar"),
            m("h4", "Antal registrerade kunder: " + kund.length),
            kund.map(function (k) {
                [
                    k.paymentmethod == "Direct" ? [
                        count ++
                    ] : null,
                ]
            }),
            m("form", {
                onsubmit: function(event) {
                    event.preventDefault();
                    open == 1 ? [
                        open = 0
                    ] : open = 1
                    m.route.set(`/kunder`);
                }
            }, [
                m(`input[type=submit][value=${text}].Btn`, `Spara`)
            ]),
            open == 1 ? [
                m("table.park", [
                    m("thead", [
                        m("tr", [
                            m("th", "KundID"),
                            m("th", "Namn"),
                            m("th", "Email"),
                            m("th", "Betalmetod"),
                            m("th", ""),

                        ])
                    ]),
                    m("tbody", kund.map(function (k) {
                        return m("tr", [
                            m("td", {"data-title": "KundID"}, k.id),
                            m("td", {"data-title": "Namn"}, k.firstname + " " + k.lastname),
                            m("td",  {"data-title": "Email"}, k.email),
                            m("td",  {"data-title": "Betalmetod"}, k.paymentmethod),
                            m("td",  {"data-title": ""}, [
                                m("a.click", { href:`#!/kunder:${k.id}` }, "Visa kundhistorik")
                            ]),
                        ])
                    })),
                ]),
            ] : null,   
        ]);
    },
};

export default kunder;
