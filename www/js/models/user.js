let userModel = {
    currentUser: {
        firstname: 'John',
        lastname: 'Doe',
        phone: '070 - 123 45 78',
        email: 'john.doe@john.doe',
        credits: 666,
        id: '1',
        paymentmethod: 'Direkt'
    },
    changePayment:false,
    selectedPaymentMethod: 'Direkt',
    allHistory: [
        {
            date: '2021-11-03 05:23:06',
            duration: '00:10:53',
            price: 28,
            paid: true,
            bikeid: '1'
        },
        {
            date: '2021-11-04 11:27:48',
            duration: '00:23:54',
            price: 47,
            paid: false,
            bikeid: '3'
        },
        {
            date: '2021-11-07 21:32:10',
            duration: '00:29:01',
            price: 58,
            paid: false,
            bikeid: '666'
        },
        {
            date: '2021-11-09 13:37:00',
            duration: '00:48:54',
            price: 99,
            paid: true,
            bikeid: '23'
        },
    ],
    changePaymentMethod: (e) => {
        console.log(e);
        userModel.currentUser.paymentmethod = userModel.selectedPaymentMethod;
        userModel.changePayment = false;
        userModel.selectedPaymentMethod = 'Direkt';
    }
}

export default userModel;
