var m = require("mithril");

var delayed = {
    url: "https://trafik.emilfolino.se/delayed",
    currentDelayeds: [],
    loadAll: function() {
        return m.request({
            method: "GET",
            url: delayed.url
        }).then(function(result) {
            delayed.currentDelayeds = result.data;
        });
    }
};

export default delayed;
