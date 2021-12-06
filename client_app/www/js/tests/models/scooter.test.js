global.window = require("mithril/test-utils/browserMock.js")();
global.document = window.document;

var scooter = require('./../../models/scooter');

o.spec("ScooterModel", function() {
    o("Initial State", function() {


        o(scooter.id).equals('')
    })
})
