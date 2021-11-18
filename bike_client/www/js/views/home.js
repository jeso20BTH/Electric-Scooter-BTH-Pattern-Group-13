"use strict";

import m from 'mithril';
import { bikeModel } from '../models/bike';

let homeView = {
    rented: function() {
      if (bikeModel.currentBike.id != null && bikeModel.currentBike.id != undefined) {
        return true;
      }

      return false;
    },
    oninit: function() {
      bikeModel.getAllBikes();
      bikeModel.rent(2);
    },
    view: function() {
        return m("div.container", [
            m("h1", "Home"),
            this.rented() ? m("h3", "Current Bike Information:") : '',
            this.rented() ? 
              m("table", { class: "table table-stacked table-striped"}, [
                  m("thead", [
                      m("tr", [
                          m("th", "Position"),
                          m("th", "Lat"),
                          m("th", "Lng"),
                          m("th", "Velocity"),
                          m("th", "Battery"),
                          m("th", "City")
                      ])
                  ]),
                  m("tbody", [
                    m("tr", [
                      m('td[data-title="Lat"]', bikeModel.currentBike.xcoord),
                      m('td[data-title="Lng"]', bikeModel.currentBike.ycoord),
                      m('td[data-title="Velocity"]', bikeModel.currentBike.velocity),
                      m('td[data-title="Battery"]', bikeModel.currentBike.battery),
                      m('td[data-title="City"]', bikeModel.currentBike.cityid)
                    ])
                  ])
              ]) : 
              m("p.text-primary", "Please choose the bike to rent."),

            m("hr"),

            //control buttons
            !this.rented() ?
              m("button.button.green-button.full-width-button",
                {
                  onclick: function() {
                    alert("I am Rent button!");
                  }
                },
                "Rent"
              ) :
              m("button.button.blue-button.full-width-button",
                {
                  onclick: function() {
                    alert("I am Return button!");
                  }
                },
                "Return"
              ),
            this.rented() ?
              m("button.button.green-button.full-width-button",
                { 
                  onclick: function() {
                    alert("I'm switch on/off button!");
                  } 
                },
                "Switch ON/OFF"
              ) : '',
            this.rented() ?
              m("button.button.green-button.full-width-button",
                { 
                  onclick: function() {
                    alert("I'm charge button!");
                  } 
                },
                "Charge Battery"
              ) : '',
        ]);
    }
};

export { homeView };
