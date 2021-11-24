# OAuth for local system

## Introduction
This application is a part of a system for handle electric scooters. It was made for the course Web based frameworks and design patterns at [BTH](https://www.bth.se/). It is made as an group work with different members contribute with different parts of the system.

## Techniques
This application is made in nodeJS with an express server running. To get it going just use `npm start`.

It uses OAuth through GitHub with an callback to handle what happens when you wanna authorize yourself.

## Setup
To get this project going you could either use the included docker-compose file, and run the command `docker-compose up -d oauth`

if you would like you use it in your own project
1. You need to register your project ass an new [OAuth application](https://github.com/settings/applications/new)
    - The callback URL shall be `host:port/github/callback/`, the published version for example has the callback `http://localhost:666/github/callback/`
2. Next you need to add `config.json` which contains `clientID` and `clientSecret`. I have added an `config-example.json` which you can use.

That is the steps needed to setup the OAuth service.

## Use OAuth
This is an explanation of how you could use OAuth for authorization.
1. In the service you wanna connect you need to store the clientId some where, my recommendation is in the same way as in the OAuth service using an `config.json`
2. for your tag used for authorization you need to setup the URL with an callback URL to where you will go when you are authorized. As shown bellow.
``` html
<a href="https://github.com/login/oauth/authorize?client_id=<clientID>&scope=user:email&&redirect_uri=<redirecturl>?callback=<urlwhenauthorized>"></a>

<a href="https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user:email&&redirect_uri=http://localhost:666/github/callback?callback=http://localhost:8000!/success/"></a>
```

- The first one is an common example of the URL parts
    `https://github.com/login/oauth/authorize?client_id=<clientID>&scope=user:email&&redirect_uri=<redirecturl>?callback=<urlwhenauthorized>`
        - `https://github.com/login/oauth/authorize` - is where github authorizes you
        - `client_id=<clientID>` - is the client id for your OAuth service
        - `scope=user:email` - specifies what data you are allowed to access, in this case the public and the users email.
        - `redirect_uri=<redirecturl>` - Is where you should go once you have been authorized.
        - `callback=<urlwhenauthorized>` - Is where you shall go after the authorization has been done. It is used to be able to use the same OAuth service with multiple services.
- Lets take a look at an real example given as the second anchor tag above.
        - The first three parts is the same, with authrization-url, client id and scope
        - `redirect_uri=http://localhost:666/github/callback` - Takes you to an route in your OAuth service if it is setup as above, with port 666.
        - `callback=http://localhost:8000!/success/` - Is where on your service you shall go once you are authorized. In this case you while be sent to a service on port 8000, with the route /success. If you look closer there is an `!` in the route `!/success/` that way the service can handle both routing with and without shebang. the route it will take you to in this case is not `http://localhost:8000!/success/` but instead `http://localhost:8000#!/success/`. If you use an route without an `!` it will send you to that route.
3. Once you have been authorized and taken back to your callback your, you will be given an token to use to fetch data. The userId is accessible as part of the route. The callback route `http://localhost:8000#!/success/` will be `http://localhost:8000#!/success/<userId>`.
Bellow you can find an example for how the callback route could be setup through Mithril.
```js
"/success/:id": {
    onmatch: async function(args) {
        let userId = args.id

        await authModel.login(userId);

        authModel.authorized = true;

        m.route.set('/')
    }
}
```

- In this case you can get the id with the help of `args`
- Next step is to fetch the actual data for the user. In this case it is done by the help of the login function.
- Then you are authorized and an new route is set
4. Lets take an look on how you could fetch data.
```js
let data = await axios({
    method: 'post',
    url: 'http://localhost:666/data',
    data: {
        id: id
    },
})
```
in this case the call is made with axios. you need to send the userId as part of the body in an parameter named `id`, it will return an JSON-object with all the user data as shown bellow.
```
{
    avatar_url,
    bio,
    blog,
    company,
    created_at,
    email,
    events_url,
    followers,
    followers_url,
    following,
    following_url,
    gists_url,
    gravatar_id,
    hireable,
    html_url,
    id,
    location,
    login,
    name,
    node_id,
    organizations_url,
    public_gists,
    public_repos,
    received_events_url,
    repos_url,
    site_admin,
    starred_url,
    subscriptions_url,
    twitter_username,
    type,
    updated_at,
    url
}
```

Hope you enjoy!
