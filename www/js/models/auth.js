import m from 'mithril';

var authModel = {
    authorized: false,
    currentUser: {
        name: 'Jesper Stolt',
        credits: 666
    },
    register: () => {
        console.log('register');
    },
    login: () => {
        console.log('login');
        authModel.authorized = true;

        return m.route.set("/");
    }
}

export default authModel;
