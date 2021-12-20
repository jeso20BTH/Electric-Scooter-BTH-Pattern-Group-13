'use strict'
import m from 'mithril';
import allCities from '../models/city';
import userModel from '../models/user';



let cityId;

let omd = {
    view: function (vnode) {
        userModel.currentUser = (vnode.attrs.id).substring(3)
        cityId = (vnode.attrs.id)[1]
        allCities.cityId = cityId
        return m("main.start", [
            m("h1", "Flytten lyckades!"),
            m("p", "Vänligen vänta medans servicepersonalen flyttar cykeln..."),
        ])
    },
    oncreate: function() {
        f1()   
    }
}

function refreshPage(){
    allCities.refresh == 0 ? [
        allCities.refresh++,
        window.location.reload()
    ] : null;
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
