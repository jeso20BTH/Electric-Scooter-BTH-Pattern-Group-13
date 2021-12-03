"use strict";
import m from 'mithril';
import allCities from '../models/city';


console.log(allCities.bikeId)


let test = {
    view: function () {
        let bikeid = ((allCities.bikeId).substring(32,(allCities.bikeId).length - 16))

        return m("main.container", [
            m("h1", bikeid),
            m("p", "Sta."),
        ]);
    },
};

export default test;
