let chai = require('chai')
let expect = chai.expect;
const sinon = require("sinon");

import db from './../www/js/models/db';

describe("Database", () => {
    let sandbox, callDatabaseStub;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        callDatabaseStub = sandbox.stub(db, 'callDatabase');
    })

    afterEach(() => {
        sandbox.restore();
    })

    describe("Cities", () => {
        it("Get Cities shall return correct data", async () => {
            let data = [{id: 1}, {id:2}]
            callDatabaseStub.returns({cities: data});

            let cities = await db.getCities();

            expect(cities).to.be.an('array');
            expect(cities.length).to.be.equal(2);
            expect(cities[0].id).to.be.equal(1);
            expect(cities[1].id).to.be.equal(2);
            expect(callDatabaseStub.calledOnce).to.be.true;
        })

        it("Get City shall return correct data", async () => {
            let data = {id: 1}
            callDatabaseStub.returns({city: data});

            let city = await db.getCity(1);
            expect(city).to.be.an('object');
            expect(city.id).to.be.equal(1);
            expect(callDatabaseStub.calledOnce).to.be.true;
        })
    })

    describe("Users", () => {
        it("Get user shall return correct data", async () => {
            let data = {id: 1}
            callDatabaseStub.returns({customer: data});

            let user = await db.getUser('test@test');

            expect(user).to.be.an('object');
            expect(user.id).to.be.equal(1);
            expect(callDatabaseStub.calledOnce).to.be.true;
        })

        it("Add user shall return correct data", async () => {
            let data = {id: 1}
            callDatabaseStub.returns({addCustomer: data});

            let user = await db.addUser({
                email: 'test@test',
                firstname: 'test',
                lastname: 'test'
            });
            expect(user).to.be.an('object');
            expect(user.id).to.be.equal(1);
            expect(callDatabaseStub.calledOnce).to.be.true;
        })

        it("Update user shall return correct data", async () => {
            let data = {id: 1}
            callDatabaseStub.returns({updateCustomer: data});

            let user = await db.updateUser({
                email: 'test@test',
                firstname: 'test',
                lastname: 'test',
                balance: 0
            });
            expect(user).to.be.an('object');
            expect(user.id).to.be.equal(1);
            expect(callDatabaseStub.calledOnce).to.be.true;
        })
    })

    describe("Bikes", () => {
        it("Get bikes shall return correct data", async () => {
            let data = [{id: 1}, {id: 2}]
            callDatabaseStub.returns({bikes: data});

            let bikes = await db.getBikes();

            expect(bikes).to.be.an('array');
            expect(bikes.length).to.be.equal(2);
            expect(bikes[0].id).to.be.equal(1);
            expect(bikes[1].id).to.be.equal(2);
            expect(callDatabaseStub.calledOnce).to.be.true;
        })

        it("Get bike shall return correct data", async () => {
            let data = {id: 1}
            callDatabaseStub.returns({bike: data});

            let bike = await db.getBike(1);
            expect(bike).to.be.an('object');
            expect(bike.id).to.be.equal(1);
            expect(callDatabaseStub.calledOnce).to.be.true;
        })

        it("Update bike shall return correct data", async () => {
            let data = {id: 1}
            callDatabaseStub.returns({updateBike: data});

            let bike = await db.updateBike({
                available: 1,
                id: 1,
            });
            expect(bike).to.be.an('object');
            expect(bike.id).to.be.equal(1);
            expect(callDatabaseStub.calledOnce).to.be.true;
        })
    })

    describe("Log", () => {
        it("Add log shall return correct data", async () => {
            let data = {id: 1}
            callDatabaseStub.returns({addHistory: data});

            let log = await db.addLogEntry({
                bikeid: 1,
                customerid: 1,
                xcoord: 1.234,
                ycoord: 1.234,
                cityid: 1
            });

            expect(log).to.be.an('object');
            expect(log.id).to.be.equal(1);
            expect(callDatabaseStub.calledOnce).to.be.true;
        })

        it("Update Log with position and paid staus shall return correct data", async () => {
            let data = {id: 1}
            callDatabaseStub.returns({updateHistory: data});

            let log = await db.updateLogPositionAndPayed({
                id: 1,
                xcoord: 1.234,
                ycoord: 1.234,
                payed: 0
            });

            expect(log).to.be.an('object');
            expect(log.id).to.be.equal(1);
            expect(callDatabaseStub.calledOnce).to.be.true;
        })

        it("Update Log with position shall return correct data", async () => {
            let data = {id: 1}
            callDatabaseStub.returns({updateHistory: data});

            let log = await db.updateLogPosition({
                id: 1,
                xcoord: 1.234,
                ycoord: 1.234
            });

            expect(log).to.be.an('object');
            expect(log.id).to.be.equal(1);
            expect(callDatabaseStub.calledOnce).to.be.true;
        })

        it("Update Log with paid staus shall return correct data", async () => {
            let data = {id: 1}
            callDatabaseStub.returns({updateHistory: data});

            let log = await db.updateLogPayed({
                id: 1,
                payed: 0
            });

            expect(log).to.be.an('object');
            expect(log.id).to.be.equal(1);
            expect(callDatabaseStub.calledOnce).to.be.true;
        })
    })
})
