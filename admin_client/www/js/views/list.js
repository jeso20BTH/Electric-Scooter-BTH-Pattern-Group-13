"use strict";
import m from 'mithril';
import deliveries from '../models/deliveries';
import allCities from '../models/city';



let list = {
    view: function () {
        return m("main.container", [
            m("h1", allCities.oneCity,  allCities.cityId),
            m("p", "Start."),
        ]);
    },
};

export default list;
