'use strict'
import m from 'mithril';
import allCities from '../models/city';
import parkingspaceInCity from '../models/parkingspaces';



let response = null;

let cities = {
    oninit: (async () => {
        await parkingspaceInCity.getPark()
        response = await allCities.getCities()
        m.redraw()
    })(),
    view: function () {
        return m("main.container_city", [
            response !== null  ? [ 
                m("h3", "Välj stad"),
                m("div.cities_body", response.map(function (city) {
                    return m("div.cities", [
                        m("a.click", { href:`#!/karta:${city.id}` }, city.name)
                    ]);
                }))
            ]: m("p", "Laddar städer...."),
            ])
    }
}

export default cities;
