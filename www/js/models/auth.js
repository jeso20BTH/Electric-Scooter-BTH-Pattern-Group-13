import m from 'mithril';

const auth = {
    apiKey: "43ced3f6cdf317a3ac693841fe0f3c10",
    url: "https://auth.emilfolino.se/",
    email: "",
    password: "",
    token: "",
    message: "",
    login: function() {
        return m.request({
            method: "POST",
            url: auth.url + "login",
            body: {
                api_key: auth.apiKey,
                email: auth.email,
                password: auth.password
            }
        }).then(function(result) {
            auth.email = "";
            auth.password = "";

            auth.token = result.data.token;
            auth.message = result.data.message;

            return m.route.set("/");
        }).catch(function(reason) {
            auth.message = reason.response.errors.detail;
        });
    },
    register: function() {
        return m.request({
            method: "POST",
            url: auth.url + "register",
            body: {
                api_key: auth.apiKey,
                email: auth.email,
                password: auth.password
            }
        }).then(function() {
            auth.token = "";
            auth.login();
        }).catch(function(reason) {
            auth.message = reason.response.errors.detail;
        });
    }
};

export { auth };
