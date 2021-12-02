// models/position.js
"use strict";

import m from "mithril";

import dbModel from './db';

const position = {
    currentCity: 1,
    allCities: [],
    currentPosition: {},
    getPosition: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position.geoSuccess,
                position.geoError
            );
        }
    },

    geoSuccess: function(pos) {
        position.currentPosition = pos.coords;
        m.redraw();
    },

    geoError: function(error) {
        console.log('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    },
    getCities: async () => {
        position.allCities = await dbModel.getCities();

        m.redraw();
    }
};

export default position;
