const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser')
var cors = require('cors')

let config;
let data = {};

try {
    config = require('./config.json');
} catch (e) {
    console.log(e);
}

let redirectRoutes = {
    userapp: 'http://localhost:8000#!/success/',
    userclient: 'http://localhost:8020#!/success/',
    adminclient: 'http://localhost:8080#!/success/',
}

app.use(bodyParser.json());

let access_token = "";
const clientID = process.env.clientID || config.clientID;
const clientSecret = process.env.clientSecret || config.clientSecret;

// Declare the callback route
app.get('/github/callback/', (req, res) => {
    // The req.query object has the query params that were sent to this route.
    const requestToken = req.query.code
    console.log(req.query);

    axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        // Set the content type header, so that we get the response in JSON
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        access_token = response.data.access_token
        res.redirect(`/success?callback=${req.query.callback}`);
    })
})

app.get('/success', async function(req, res) {
    let user = await axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
          Authorization: 'token ' + access_token
        }
    })

    user = user.data;

    let userId = user.id;
    let emails = await axios({
        method: 'get',
        url: `https://api.github.com/user/emails`,
        headers: {
            Authorization: 'token ' + access_token
        }
    })

    emails = emails.data;

    let email = emails.find(email => email.primary);

    user.email = email.email;

    data[userId] = user;

    console.log(req.query.callback);
    console.log(`${req.query.callback}#!/success/${userId}`);

    let url = req.query.callback

    if (url.includes('!')) {
        let splittingIndex = url.indexOf('!');
        let host = url.substring(0, splittingIndex);
        let route = url.substring(splittingIndex);
        url = `${host}#${route}`;
    }

    console.log(url);

    // console.log(redirectRoutes, redirectRoutes[req.query.callback]);

    res.redirect(`${url}${userId}`);
});

app.use(cors());

app.post('/data', (req, res) => {
    let userId = req.body.id;

    res.json(data[userId]);
})

const port = 666;
app.listen(port , () => console.log('App listening on port ' + port));
