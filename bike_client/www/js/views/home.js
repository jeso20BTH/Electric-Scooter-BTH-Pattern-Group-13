"use strict";

import m from 'mithril';
import { bikeModel } from '../models/bike';
import { customerModel } from '../models/customer';

let homeView = {
    title: "Home",
    bikeId: null,
    customerEmail: null,
    rented: false,
    oninit: function() {
    
    },
    view: function() {
        return m("div.container", [
            m("h1", homeView.title),
            this.rented ? m("h3", "Current Bike Information:") : '',
            this.rented ? 
              m("table", { class: "table table-stacked table-striped"}, [
                  m("thead", [
                      m("tr", [
                          m("th", "Bike ID"),
                          m("th", "Lat"),
                          m("th", "Lng"),
                          m("th", "Velocity"),
                          m("th", "Battery"),
                          m("th", "City")
                      ])
                  ]),
                  m("tbody", [
                    m("tr", [
                      m('td[data-title="Bike ID"]', bikeModel.currentBike.id),
                      m('td[data-title="Lat"]', bikeModel.currentBike.xcoord),
                      m('td[data-title="Lng"]', bikeModel.currentBike.ycoord),
                      m('td[data-title="Velocity"]', bikeModel.currentBike.velocity),
                      m('td[data-title="Battery"]', bikeModel.currentBike.battery),
                      m('td[data-title="City"]', bikeModel.currentBike.city.name)
                    ])
                  ])
              ]) : '',
              // m("p.text-primary", "Please choose the bike to rent."),

            m("hr"),

            //control inputs and buttons
            !this.rented ? m("label.input-label", "Your Email") : '',
            !this.rented ? 
              m("input.input[type=text][placeholder=Enter your email.][required]", {
                oninput: function (e) {
                  homeView.customerEmail = e.target.value;
                },
                value: homeView.customerEmail
              }) : '',
            !this.rented ? m("label.input-label", "Bike ID") : '',
            !this.rented ? 
              m("input.input[type=number][placeholder=Enter the bike ID for rent.][required]", {
                oninput: function (e) {
                  homeView.bikeId = parseInt(e.target.value);
                },
                value: homeView.bikeId
              }) : '',
            !this.rented ?
              m("button.button.green-button.full-width-button",
                {
                  onclick: async function() {
                    if (!homeView.customerEmail) {
                      alert('Enter your email!');
                      return false;
                    }
                    if (!homeView.bikeId) {
                      alert('Enter the bike ID for rent!');
                      return false;
                    }

                    let bike = await bikeModel.getBike(homeView.bikeId);
                    let customer = await customerModel.getCustomerByEmail(homeView.customerEmail);
                    // let bike = null;
                    // let customer = null;
                    console.log("bike:", bike);
                    console.log("customer:", customer);
                    
                    if (!customer) {
                      alert("Not registered customer!");
                      homeView.customerEmail = null;
                      m.redraw();
                      return false;
                    }

                    if (!bike || !bike.available) {
                      alert("Can't rent this bike at this time!");
                      homeView.bikeId = null;
                      m.redraw();
                      return false;
                    }

                    homeView.rented = true;

                    bikeModel.inRent = true;
                    bikeModel.rentTime = new Date();
                    console.log(bikeModel);
                    m.redraw();
                  }
                },
                "Rent"
              ) :
              m("button.button.blue-button.full-width-button",
                {
                  onclick: function() {
                    homeView.bikeId = null;
                    homeView.customerEmail = null;
                    bikeModel.unrent();
                    console.log(bikeModel);
                    homeView.rented = false;
                  }
                },
                "Return"
              ),
            this.rented ?
              m("button.button.green-button.full-width-button",
                { 
                  onclick: function() {
                    alert("I'm switch on/off button!");
                  } 
                },
                "Switch ON/OFF"
              ) : '',
            this.rented ?
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