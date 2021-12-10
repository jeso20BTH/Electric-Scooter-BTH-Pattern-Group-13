'use strict'
import m from 'mithril';
import allCities from '../models/city';


let cityId;


let omd = {
    view: function (vnode) {
        cityId = ((vnode.attrs.id).substring(1)),
        allCities.cityId = cityId

        return m("main.container", [
            m("h1", "Flytten lyckades!"),
            m("p", "Vänligen vänta medans service flyttar cyklen..."),
        ])
    },
    oncreate: function() {
        f1()   
    }
}

function refreshPage(){
    console.log(allCities.refresh)
    allCities.refresh == 0 ? [
        allCities.refresh++,
        console.log(allCities.refresh),
        window.location.reload()
    ] : console.log("har refresh")
} 

function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(refreshPage());
      }, 2000);
      setTimeout(() => {
        resolve(m.route.set(`/karta:${allCities.cityId}`));
      }, 5000);
    });
}

async function f1() {
    await resolveAfter2Seconds();
}
  

export default omd;
