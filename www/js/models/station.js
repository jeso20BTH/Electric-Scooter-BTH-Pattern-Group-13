var m = require("mithril");

var station = {
    url: "https://trafik.emilfolino.se/stations",
    currentStations: [],
    loadAll: function() {
        return m.request({
            method: "GET",
            url: station.url
        }).then(function(result) {
            station.currentStations = result.data;
        });
    }
};

export default station;
