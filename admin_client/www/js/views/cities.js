'use strict'
import m from 'mithril';
import allCities from '../models/city';


let response = null;

console.log(allCities.bikeId)

let cities = {
    oninit: (async () => {
        response = await allCities
        m.redraw();
    })(),
    view: function () {
        return m("main.container", [
            // If response inte är hämtat, visa tomt annars visa städer
                response !== null  ? 
                [ 
                    m("div.cities_body", response.data.cities.map(function (city) {
                    return m("div.cities", [
                        m("a.click", {onclick: clickListener}, city.name),
                ])
                ;
            }))
        ]: 
            m("p", "Det finns inga inleveranser."),                
        ])
    }
}



let clickListener = {
    handleEvent: function(e) {
        allCities.oneCity = e.target.innerText
        response.data.cities.map(function (city) {
            city.name == allCities.oneCity ? [
                allCities.cityId = city.id,
            ]
                : null
        })
        m.route.set("/map");
    }
};
  
export default cities;
