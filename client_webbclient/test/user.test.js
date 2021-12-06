let chai = require('chai')
let expect = chai.expect;
const sinon = require("sinon");

import db from './../www/js/models/db';
import user from './../www/js/models/user';
import city from './../www/js/models/city';
import u from './../www/js/models/utilities';

describe("User", () => {
    let sandbox,
    getLoginDataStub,
    getUserStub,
    updateUserStub,
    addUserStub,
    calculatePriceStub,
    getCityStub,
    getYearStub,
    getMonthStub,
    getDayStub,
    calculateDurationStub,
    getExpDateStub;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        getUserStub = sandbox.stub(db, 'getUser');
        updateUserStub = sandbox.stub(db, 'updateUser');
        addUserStub = sandbox.stub(db, 'addUser');
        getLoginDataStub = sandbox.stub(user, 'getLoginData');
        calculatePriceStub = sandbox.stub(u, 'calculatePrice');
        getCityStub = sandbox.stub(city, 'getCity');
        getYearStub = sandbox.stub(u, 'getYear');
        getMonthStub = sandbox.stub(u, 'getMonth');
        getDayStub = sandbox.stub(u, 'getDay');
        calculateDurationStub = sandbox.stub(u, 'calculateDuration');
        getExpDateStub = sandbox.stub(u, 'getExpDate');

        getLoginDataStub.returns({email: 'test@test', name: 'test test'});
        addUserStub.returns({email: 'test@test.se', firstname: 'test', lastname: 'test'});

        calculatePriceStub.onCall(0).returns(100)
        calculatePriceStub.onCall(1).returns(200)
        calculatePriceStub.onCall(2).returns(300)

        getCityStub.returns({
            id: 1,
            startingfee: 10,
            fee: 20,
            discount: 15,
            penaltyfee: 20,
            name: 'test'
        })

        getYearStub.returns(2021);

        getMonthStub.onCall(0).returns(11);
        getMonthStub.onCall(1).returns(12);
        getMonthStub.onCall(2).returns(11);

        getDayStub.onCall(0).returns(28);
        getDayStub.onCall(1).returns(2);
        getDayStub.onCall(2).returns(29);

        calculateDurationStub.onCall(0).returns('00:15:00');
        calculateDurationStub.onCall(1).returns('00:30:00');
        calculateDurationStub.onCall(2).returns('00:45:00');

        getExpDateStub.onCall(0).returns('2021-12-14');
        getExpDateStub.onCall(1).returns('2022-01-14');
        getExpDateStub.onCall(2).returns('2021-12-14');
    })

    afterEach(() => {
        sandbox.restore();
    })
    describe("Initial state", () => {
        it("History mode shall be history", () => {
            expect(user.historyMode).to.be.an('string');
            expect(user.historyMode).to.equal('history');
        })

        it("Current user shall be an empty object", () => {
            expect(user.currentUser).to.be.an('object');
            expect(Object.keys(user.currentUser).length).to.equal(0);
        })

        it("Filtered history shall be an empty object", () => {
            expect(user.filteredHistory).to.be.an('object');
            expect(Object.keys(user.filteredHistory).length).to.equal(0);
        })

        it('Shall not be authorized', () => {
            expect(user.authorized).to.be.false;
        })

        it('Change payment shall be false', () => {
            expect(user.changePayment).to.be.false;
        })

        it('Selected payment method shall be direct', () => {
            expect(user.selectedPaymentMethod).to.be.an('string');
            expect(user.selectedPaymentMethod).to.equal('Direct');
        })
    })

    describe('Change user settings', () => {
        it('Change history mode shall toggle between history and invoice', () => {
            expect(user.historyMode).to.equal('history');

            user.changeHistoryMode();

            expect(user.historyMode).to.equal('invoice');
            user.changeHistoryMode();

            expect(user.historyMode).to.equal('history');
        })

        it('Change payment method shall update payment method to monthly', async () => {
            user.selectedPaymentMethod = 'Monthly'
            updateUserStub.returns({
                email: 'test@test',
                firstname: 'test',
                lastname: 'test',
                balance: 0,
                paymentmethod: user.selectedPaymentMethod,
            })

            getUserStub.returns({
                email: 'test@test',
                firstname: 'test',
                lastname: 'test',
                balance: 0,
                paymentmethod: user.selectedPaymentMethod,
            })

            expect(user.selectedPaymentMethod).to.equal('Monthly');

            await user.changePaymentMethod();

            expect(user.currentUser).to.be.an('object');
            expect(user.currentUser.email).to.equal('test@test');
            expect(user.currentUser.firstname).to.equal('test');
            expect(user.currentUser.lastname).to.equal('test');
            expect(user.currentUser.balance).to.equal(0);
            expect(user.currentUser.paymentmethod).to.equal('Monthly');
            expect(user.selectedPaymentMethod).to.equal('Direct');
            expect(user.changePayment).to.be.false;
        })


        it('Change payment method shall update payment method to direct', async () => {
            user.selectedPaymentMethod = 'Direct'
            updateUserStub.returns({
                email: 'test@test',
                firstname: 'test',
                lastname: 'test',
                balance: 0,
                paymentmethod: user.selectedPaymentMethod,
            })

            getUserStub.returns({
                email: 'test@test',
                firstname: 'test',
                lastname: 'test',
                balance: 0,
                paymentmethod: user.selectedPaymentMethod,
            })

            expect(user.selectedPaymentMethod).to.equal('Direct');

            await user.changePaymentMethod();

            expect(user.currentUser).to.be.an('object');
            expect(user.currentUser.email).to.equal('test@test');
            expect(user.currentUser.firstname).to.equal('test');
            expect(user.currentUser.lastname).to.equal('test');
            expect(user.currentUser.balance).to.equal(0);
            expect(user.currentUser.paymentmethod).to.equal('Direct');
            expect(user.selectedPaymentMethod).to.equal('Direct');
            expect(user.changePayment).to.be.false;
        })
    })

    describe("Login", () => {
        it('Shall call the correct db functions', async () => {
            getUserStub.onCall(0).returns(null);
            getUserStub.onCall(1).returns({
                email: 'test@test',
                firstname: 'test',
                lastname: 'test'
            });

            await user.login(1);
            expect(getUserStub.calledTwice).to.be.true;
            expect(addUserStub.calledOnce).to.be.true;
            expect(getLoginDataStub.calledOnce).to.be.true;
        })

        it('Shall have the correct user data', () => {
            expect(user.currentUser).to.be.an('object');
            expect(user.currentUser.email).to.equal('test@test');
            expect(user.currentUser.firstname).to.equal('test');
            expect(user.currentUser.lastname).to.equal('test');
        })
    })

    describe('Filter log', () => {
        it('Shall return the filtered log as an object all log rows added', () => {
            let log = [
                {
                    id: 1,
                    payed: 0,
                    cityid: 1,
                    starttime: 0,
                    endtime: 1,
                    startparking: 'unparked',
                    endparking: 'unparked'
                },
                {
                    id: 2,
                    payed: 0,
                    cityid: 1,
                    starttime: 0,
                    endtime: 1,
                    startparking: 'unparked',
                    endparking: 'unparked'
                },
                {
                    id: 3,
                    payed: 0,
                    cityid: 1,
                    starttime: 0,
                    endtime: 1,
                    startparking: 'unparked',
                    endparking: 'unparked'
                }
            ];

            let filterLog = user.filterLog(log);

            expect(filterLog).to.be.an('object');
            expect(Object.keys(filterLog).length).to.equal(2);

            expect(filterLog['2021-11']).to.be.an('array');
            expect(filterLog['2021-11'].length).to.equal(2);
            expect(filterLog['2021-11'][0]).to.be.an('object');
            expect(filterLog['2021-11'][0].id).to.equal(1);
            expect(filterLog['2021-11'][0].year).to.equal(2021);
            expect(filterLog['2021-11'][0].month).to.equal(11);
            expect(filterLog['2021-11'][0].day).to.equal(28);
            expect(filterLog['2021-11'][0].expDate).to.equal('2021-12-14');
            expect(filterLog['2021-11'][0].price).to.equal(100);
            expect(filterLog['2021-11'][0].duration).to.equal('00:15:00');
            expect(filterLog['2021-11'][0].city).to.equal('test');
            expect(filterLog['2021-11'][1]).to.be.an('object');
            expect(filterLog['2021-11'][1].id).to.equal(3);
            expect(filterLog['2021-11'][1].year).to.equal(2021);
            expect(filterLog['2021-11'][1].month).to.equal(11);
            expect(filterLog['2021-11'][1].day).to.equal(29);
            expect(filterLog['2021-11'][1].expDate).to.equal('2021-12-14');
            expect(filterLog['2021-11'][1].price).to.equal(300);
            expect(filterLog['2021-11'][1].duration).to.equal('00:45:00');
            expect(filterLog['2021-11'][1].city).to.equal('test');

            expect(filterLog['2021-12']).to.be.an('array');
            expect(filterLog['2021-12'].length).to.equal(1);
            expect(filterLog['2021-12'][0]).to.be.an('object');
            expect(filterLog['2021-12'][0].id).to.equal(2);
            expect(filterLog['2021-12'][0].year).to.equal(2021);
            expect(filterLog['2021-12'][0].month).to.equal(12);
            expect(filterLog['2021-12'][0].day).to.equal(2);
            expect(filterLog['2021-12'][0].expDate).to.equal('2022-01-14');
            expect(filterLog['2021-12'][0].price).to.equal(200);
            expect(filterLog['2021-12'][0].duration).to.equal('00:30:00');
            expect(filterLog['2021-12'][0].city).to.equal('test');
        })

        it('Shall return the filtered log as an object two log rows added', () => {
            let log = [
                {
                    id: 1,
                    payed: 0,
                    cityid: 1,
                    starttime: 0,
                    endtime: 1,
                    startparking: 'unparked',
                    endparking: 'unparked'
                },
                {
                    id: 2,
                    payed: 0,
                    cityid: 1,
                    starttime: 0,
                    endtime: 1,
                    startparking: 'unparked',
                    endparking: 'unparked'
                },
                {
                    id: 3,
                    payed: 1,
                    cityid: 1,
                    starttime: 0,
                    endtime: 1,
                    startparking: 'unparked',
                    endparking: 'unparked'
                }
            ];

            let filterLog = user.filterLog(log);

            expect(filterLog).to.be.an('object');
            expect(Object.keys(filterLog).length).to.equal(2);

            expect(filterLog['2021-11']).to.be.an('array');
            expect(filterLog['2021-11'].length).to.equal(1);
            expect(filterLog['2021-11'][0]).to.be.an('object');
            expect(filterLog['2021-11'][0].id).to.equal(1);
            expect(filterLog['2021-11'][0].year).to.equal(2021);
            expect(filterLog['2021-11'][0].month).to.equal(11);
            expect(filterLog['2021-11'][0].day).to.equal(28);
            expect(filterLog['2021-11'][0].expDate).to.equal('2021-12-14');
            expect(filterLog['2021-11'][0].price).to.equal(100);
            expect(filterLog['2021-11'][0].duration).to.equal('00:15:00');
            expect(filterLog['2021-11'][0].city).to.equal('test');

            expect(filterLog['2021-12']).to.be.an('array');
            expect(filterLog['2021-12'].length).to.equal(1);
            expect(filterLog['2021-12'][0]).to.be.an('object');
            expect(filterLog['2021-12'][0].id).to.equal(2);
            expect(filterLog['2021-12'][0].year).to.equal(2021);
            expect(filterLog['2021-12'][0].month).to.equal(12);
            expect(filterLog['2021-12'][0].day).to.equal(2);
            expect(filterLog['2021-12'][0].expDate).to.equal('2022-01-14');
            expect(filterLog['2021-12'][0].price).to.equal(200);
            expect(filterLog['2021-12'][0].duration).to.equal('00:30:00');
            expect(filterLog['2021-12'][0].city).to.equal('test');
        })
    })
})
