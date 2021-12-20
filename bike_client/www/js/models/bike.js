"use strict";

import { request, gql } from 'graphql-request';
import m from 'mithril';
import position from "../models/position.js";

const endpoint = 'http://localhost:1337/graphql';
const maxVelocity = 25;

var bikeModel = {
  id: null,
  inRent: false,
  rentTime: null,
  currentBike: {},
  allBikes: null,
  coords: {},
  
  batteryColor: '',
  batteryNotification: '',
  
  switch: false,
  switchNotification: 'Switch OFF',
  switchColor: 'text-danger',

  vEID: null,
  bEID: null,
  bCEID: null,

  getAllBikes: () => {
    
  },
  getBike: async (bikeId) => {
    const query = gql`
        query getBike($bikeId: Int!) {
          bike (id: $bikeId) {
            id,
            available,
            velocity,
            battery,
            xcoord,
            ycoord,
            cityid,
            city {
              id,
              name,
              startingfee,
              penaltyfee,
              fee,
              discount
            }
          }
        }
      `
      const variables = {
        bikeId: bikeId,
      }
      const getData = () => {
        return new Promise(resolve => {
          request(endpoint, query, variables).then((res) => {
            resolve(res.bike);
          }).catch((error) => { console.log(error); });
        })
      }
      
      bikeModel.currentBike = await getData();

      // check battery
      bikeModel.checkBattery();

      return bikeModel.currentBike;
  },
  rent: () => {
    bikeModel.inRent = true;
    bikeModel.rentTime = new Date();

    bikeModel.saveStatus();
    bikeModel.discharge();
  },
  unrent: () => {
      clearInterval(bikeModel.bEID);
      clearInterval(bikeModel.vEID);
      clearInterval(bikeModel.bCEID);
      
      bikeModel.inRent = false;
      bikeModel.currentBike = {};
      bikeModel.rentTime = null;
      
      bikeModel.batteryColor = '';
      bikeModel.batteryNotification = '';
      
      bikeModel.switch = false;
      bikeModel.switchNotification = 'Switch OFF';
      bikeModel.switchColor = 'text-danger';

      bikeModel.vEID = null;
      bikeModel.bEID = null;
  },
  saveStatus: () => {

  },
  charge: () => {
    if (bikeModel.switch) {
      return false;
    }
        
    bikeModel.bCEID = setInterval(function() {
      if (bikeModel.currentBike.battery < 100 && bikeModel.switch == false) {
        bikeModel.currentBike.battery++;
      }

      // check battery status
      bikeModel.checkBattery();
      
      m.redraw();
    }, 1000);
  },
  discharge: () => {
    bikeModel.bEID = setInterval(function() {
      if (bikeModel.currentBike.battery > 0 && bikeModel.switch == true) {
        bikeModel.currentBike.battery--;
      }

      // check battery status
      bikeModel.checkBattery();
      
      m.redraw();
    }, 1000);
  },
  checkBattery: () => {
    // change battery color
    if (bikeModel.currentBike.battery >= 80) {
      bikeModel.batteryColor = 'text-success';
      bikeModel.batteryNotification = "";
    } else if (bikeModel.currentBike.battery >= 40 && bikeModel.currentBike.battery < 80) {
      bikeModel.batteryColor = 'text-primary';
      bikeModel.batteryNotification = "";
    } else if (bikeModel.currentBike.battery >= 20 && bikeModel.currentBike.battery < 40) {
      bikeModel.batteryColor = 'text-warning';
      bikeModel.batteryNotification = "";
    } else {
      bikeModel.batteryColor = 'text-danger';
      bikeModel.batteryNotification = "Please charge your battery!";
    }

    if (bikeModel.currentBike.battery <= 0) {
      // stop bike
      bikeModel.switch = false;
      bikeModel.switchNotification = 'Switch OFF';
      bikeModel.switchColor = 'text-danger';
    }

    if (bikeModel.bCEID != null && bikeModel.currentBike.battery >= 100) {
      // stop charging
      clearInterval(bikeModel.bCEID);
      bikeModel.bCEID = null;
    }
  },
  startEngine: () => {
    if (bikeModel.currentBike.battery <= 0) {
      return false;
    }

    bikeModel.switch = !bikeModel.switch;

    bikeModel.switchNotification = bikeModel.switch ? 'Switch ON' : 'Switch OFF';
    bikeModel.switchColor = bikeModel.switch ? 'text-success' : 'text-danger';

    if (bikeModel.switch) {
      // stop charging
      clearInterval(bikeModel.bCEID);
      bikeModel.bCEID = null;
    }

    bikeModel.velocityEmulate();
  },
  velocityEmulate: () => {
    bikeModel.vEID = setInterval(function() {
      if (bikeModel.switch && bikeModel.currentBike.battery > 0 && bikeModel.currentBike.velocity < maxVelocity) {
        bikeModel.currentBike.velocity++;
      } else if (bikeModel.currentBike.battery <= 0 && bikeModel.currentBike.velocity >= 5) {
        bikeModel.currentBike.velocity -= 5;
      } else if (bikeModel.currentBike.battery <= 0 && bikeModel.currentBike.velocity < 5) {
        bikeModel.currentBike.velocity = 0;
        bikeModel.switch = false;

        // stop velocity emulator
        clearInterval(bikeModel.vEID);
        bikeModel.vEID =null;
      }
      
      if (!bikeModel.switch && bikeModel.currentBike.velocity > 0) {
        if (bikeModel.currentBike.velocity >= 5) {
          bikeModel.currentBike.velocity -= 5;
        } else {
          bikeModel.currentBike.velocity = 0;

          // stop velocity emulator
          clearInterval(bikeModel.vEID);
          bikeModel.vEID =null;
        }
      }

      m.redraw();
    }, 2000);
  }
}

export { bikeModel };