"use strict";
import m from 'mithril';
import allCities from '../models/city';
import allCustomers from '../models/customers';

let kund;

let kunder = {
    oninit: (async () => {
        kund = await allCustomers
        // m.redraw();
    })(),
    view: function () {
        return m("main.container", [
            m("h1", allCities.cityName),
            m("table.customer", [
                m("tr", [
                    m("th", "bikeid"),
                    m("th", "batteri"),
                    m("th", "email"),
                    m("th", "balance"),
                    m("th", "paymethos"),
                ]),
                m("div", kund.map(function (k) {
                    return m("tr", [
                        m("td", k.id),
                        m("td", k.firstname),
                        m("td", k.lastname),
                        m("td", k.email),
                        m("td", k.balance),
                        m("td", k.paymentmethod),
                    ])
                })),
            ])
        ]);
    },
};

export default kunder;
