let chai = require('chai')
let expect = chai.expect;
chai.use(require("chai-as-promised"));
const sinon = require("sinon");
import scooter from './../www/js/models/scooter';
import db from './../www/js/models/db';
import auth from './../www/js/models/auth';
import utilities from './../www/js/models/utilities';

describe("Scooter", () => {
    let sandbox,
    updateBikeStub,
    getUserStub,
    updateLogPositionStub,
    getCityStub,
    addLogEntryStub,
    updateLogPayedStub,
    updateUserStub,
    updateLogPositionAndPayedStub,
    calculatePriceStub,
    getBikesStub,
    getParkingsStub;

    beforeEach(() => {
        sandbox = sinon.createSandbox();

        addLogEntryStub = sandbox.stub(db, 'addLogEntry')
        updateBikeStub = sandbox.stub(db, 'updateBike');
        updateLogPositionStub = sandbox.stub(db, 'updateLogPosition');
        getCityStub = sandbox.stub(db, 'getCity');
        updateLogPayedStub = sandbox.stub(db, 'updateLogPayed');
        updateUserStub = sandbox.stub(db, 'updateUser');
        updateLogPositionAndPayedStub = sandbox.stub(db, 'updateLogPositionAndPayed');
        getUserStub = sandbox.stub(db, 'getUser');
        calculatePriceStub = sandbox.stub(utilities, 'calculatePrice');
        getBikesStub = sandbox.stub(db, 'getBikes');
        getParkingsStub = sandbox.stub(db, 'getParkings');

        updateBikeStub.returns({id: 1, status: 1});
        getCityStub.returns({
            id: 1,
            startingfee: 1,
            fee: 1,
            discount: 1,
            penaltyfee:1
        })
        let logMonthly = {
            id: 1,
            xcoord: 1.234,
            ycoord: 1.234,
            payed: 0,
            startTime: 0,
            endTime: 1,
            startPosition: 'unparked',
            endPosition: 'unparked'
        };

        updateLogPositionAndPayedStub.returns(logMonthly);
        getUserStub.returns({
            id: 1,
            balance: 100,
            email: 'test@test',
            historylogs: [logMonthly]
        });
        updateLogPositionStub.returns({
            id: 1,
            xcoord: 1.234,
            ycoord: 1.234,
            startTime: 0,
            endTime: 1,
            payed: null,
            startPosition: 'unparked',
            endPosition: 'unparked'
        });

        updateLogPayedStub.returns({
            id: 1,
            xcoord: 1.234,
            ycoord: 1.234,
            startTime: 0,
            endTime: 1,
            payed: 0,
            startPosition: 'unparked',
            endPosition: 'unparked'
        })

        updateUserStub.returns({
            id: 1,
            balance: 0,
            email: 'test@test',
            historylogs: [logMonthly]
        })
        calculatePriceStub.returns(100);

        getBikesStub.returns([{id: 1}, {id: 2}]);
        getParkingsStub.returns([{id: 1}, {id: 2}]);
    })

    afterEach(() => {
        sandbox.restore();
    })
    describe("Initial state", () => {
        it("Id shall be ''", () => {
            expect(scooter.id).to.equal('');
        })
        it("Current log shall be {}", () => {
            expect(scooter.currentLog).to.be.an('object');
            expect(Object.keys(scooter.currentLog).length).to.equal(0);
        })
        it("In rent shall be false", () => {
            expect(scooter.inRent).to.be.false;
        })
        it("Rent time shall be null", () => {
            expect(scooter.rentTime).to.equal(null);
        })
        it("Current scooter shall be {}", () => {
            expect(scooter.currentScooter).to.be.an('object');
            expect(Object.keys(scooter.currentScooter).length).to.equal(0);
        })
        it("All scooters shall be []", () => {
            expect(scooter.allScooters).to.be.an('array');
            expect(scooter.allScooters.length).to.equal(0);
        })
        it("All parkings shall be []", () => {
            expect(scooter.allParkings).to.be.an('array');
            expect(scooter.allParkings.length).to.equal(0);
        })
    })

    describe("Rent", () => {

        let log;

        it('Shall call the correct db functions', async () => {
            let data = {
                currentScooter: {
                    id: 1,
                    xcoord: 12.345,
                    ycoord: 12.345,
                    cityid: 1,
                    available: 1
                },
                id: 1,
                email: 'test@test'
            }

            addLogEntryStub.returns({
                id: 1,
                time: '13:37'
            });
            updateBikeStub.returns({
                id: 1
            });

            log = await scooter.rent(data);
            expect(addLogEntryStub.calledOnce).to.be.true;
            expect(getUserStub.calledOnce).to.be.true;
            expect(updateBikeStub.calledOnce).to.be.true;
        })

        it('Shall have the correct log data', () => {
            let currentLog = scooter.currentLog;

            expect(log.id).to.equal(currentLog.id);
            expect(log.time).to.equal(currentLog.time);
        })

        it('inRent shall be true', () => {
            expect(scooter.inRent).to.be.true;
        })
    })

    describe('Unrent', () => {
        describe('Monthly payment', () => {
            it('Shall call the correct db functions', async () => {
                let data = {
                    currentScooter: {
                        id: 1,
                        xcoord: 1.234,
                        ycoord: 1.234
                    },
                    currentLog: {
                        id: 1
                    },
                    paymentmethod: 'Monthly',
                    currentUser: {
                        id: 1,
                        balance: 100,
                        email: 'test@test',
                        firstname: 'test',
                        lastname: 'test'
                    }
                }

                await scooter.unrent(data);

                expect(updateBikeStub.calledOnce).to.be.true;
                expect(updateLogPositionAndPayedStub.calledOnce).to.be.true;
                expect(getUserStub.calledOnce).to.be.true;
            })

            it('Shall have correct user data', () => {
                expect(auth.currentUser.id).to.equal(1);
                expect(auth.currentUser.balance).to.equal(100);
                expect(auth.currentUser.email).to.equal('test@test');
                expect(auth.currentUser.historylogs).to.be.an('array');
                expect(auth.currentUser.historylogs.length).to.equal(1);
                expect(auth.currentUser.historylogs[0].id).to.equal(1);
                expect(auth.currentUser.historylogs[0].xcoord).to.equal(1.234);
                expect(auth.currentUser.historylogs[0].ycoord).to.equal(1.234);
                expect(auth.currentUser.historylogs[0].payed).to.equal(0);
                expect(auth.currentUser.historylogs[0].startTime).to.equal(0);
                expect(auth.currentUser.historylogs[0].endTime).to.equal(1);
                expect(auth.currentUser.historylogs[0].startPosition).to.equal('unparked');
                expect(auth.currentUser.historylogs[0].endPosition).to.equal('unparked');
            })

            it('Shall remove stored data', () => {
                expect(scooter.currentScooter).to.be.an('object');
                expect(Object.keys(scooter.currentScooter).length).to.equal(0);

                expect(scooter.currentLog).to.be.an('object');
                expect(Object.keys(scooter.currentLog).length).to.equal(0);
            })

            it('inRent shall be false', () => {
                expect(scooter.inRent).to.be.false;
            })
        })

        describe('Direct payment balance to low', () => {
            it('Shall call the correct db functions', async () => {
                let data = {
                    currentScooter: {
                        id: 1,
                        xcoord: 1.234,
                        ycoord: 1.234
                    },
                    currentLog: {
                        id: 1
                    },
                    paymentmethod: 'Direct',
                    currentUser: {
                        id: 1,
                        balance: 99,
                        email: 'test@test',
                        firstname: 'test',
                        lastname: 'test'
                    }
                }

                await scooter.unrent(data);

                expect(updateBikeStub.calledOnce).to.be.true;
                expect(updateLogPositionStub.calledOnce).to.be.true;
                expect(getCityStub.calledOnce).to.be.true;
                expect(calculatePriceStub.calledOnce).to.be.true;
                expect(updateLogPayedStub.calledOnce).to.be.true;
                expect(getUserStub.calledOnce).to.be.true;
                expect(updateUserStub.called).to.be.false;
            })

            it('Shall have correct user data', () => {
                expect(auth.currentUser.id).to.equal(1);
                expect(auth.currentUser.balance).to.equal(100);
                expect(auth.currentUser.email).to.equal('test@test');
                expect(auth.currentUser.historylogs).to.be.an('array');
                expect(auth.currentUser.historylogs.length).to.equal(1);
                expect(auth.currentUser.historylogs[0].id).to.equal(1);
                expect(auth.currentUser.historylogs[0].xcoord).to.equal(1.234);
                expect(auth.currentUser.historylogs[0].ycoord).to.equal(1.234);
                expect(auth.currentUser.historylogs[0].payed).to.equal(0);
                expect(auth.currentUser.historylogs[0].startTime).to.equal(0);
                expect(auth.currentUser.historylogs[0].endTime).to.equal(1);
                expect(auth.currentUser.historylogs[0].startPosition).to.equal('unparked');
                expect(auth.currentUser.historylogs[0].endPosition).to.equal('unparked');
            })

            it('Shall remove stored data', () => {
                expect(scooter.currentScooter).to.be.an('object');
                expect(Object.keys(scooter.currentScooter).length).to.equal(0);

                expect(scooter.currentLog).to.be.an('object');
                expect(Object.keys(scooter.currentLog).length).to.equal(0);
            })

            it('inRent shall be false', () => {
                expect(scooter.inRent).to.be.false;
            })
        })

        describe('Direct payment', () => {
            it('Shall call the correct db functions', async () => {
                let logDirect = {
                    id: 1,
                    xcoord: 1.234,
                    ycoord: 1.234,
                    payed: 1,
                    startTime: 0,
                    endTime: 1,
                    startPosition: 'unparked',
                    endPosition: 'unparked'
                };

                updateLogPayedStub.returns(logDirect);
                getUserStub.returns({
                    id: 1,
                    balance: 0,
                    email: 'test@test',
                    historylogs: [logDirect]
                });
                let data = {
                    currentScooter: {
                        id: 1,
                        xcoord: 1.234,
                        ycoord: 1.234
                    },
                    currentLog: {
                        id: 1
                    },
                    paymentmethod: 'Direct',
                    currentUser: {
                        id: 1,
                        balance: 100,
                        email: 'test@test',
                        firstname: 'test',
                        lastname: 'test'
                    }
                }

                await scooter.unrent(data);

                expect(updateBikeStub.calledOnce).to.be.true;
                expect(updateLogPositionStub.calledOnce).to.be.true;
                expect(getCityStub.calledOnce).to.be.true;
                expect(calculatePriceStub.calledOnce).to.be.true;
                expect(updateLogPayedStub.calledOnce).to.be.true;
                expect(getUserStub.calledOnce).to.be.true;
                expect(updateUserStub.calledOnce).to.be.true;
            })

            it('Shall have correct user data', () => {
                expect(auth.currentUser.id).to.equal(1);
                expect(auth.currentUser.balance).to.equal(0);
                expect(auth.currentUser.email).to.equal('test@test');
                expect(auth.currentUser.historylogs).to.be.an('array');
                expect(auth.currentUser.historylogs.length).to.equal(1);
                expect(auth.currentUser.historylogs[0].id).to.equal(1);
                expect(auth.currentUser.historylogs[0].xcoord).to.equal(1.234);
                expect(auth.currentUser.historylogs[0].ycoord).to.equal(1.234);
                expect(auth.currentUser.historylogs[0].payed).to.equal(1);
                expect(auth.currentUser.historylogs[0].startTime).to.equal(0);
                expect(auth.currentUser.historylogs[0].endTime).to.equal(1);
                expect(auth.currentUser.historylogs[0].startPosition).to.equal('unparked');
                expect(auth.currentUser.historylogs[0].endPosition).to.equal('unparked');
            })

            it('Shall remove stored data', () => {
                expect(scooter.currentScooter).to.be.an('object');
                expect(Object.keys(scooter.currentScooter).length).to.equal(0);

                expect(scooter.currentLog).to.be.an('object');
                expect(Object.keys(scooter.currentLog).length).to.equal(0);
            })

            it('inRent shall be false', () => {
                expect(scooter.inRent).to.be.false;
            })
        })
    })

    describe('QR code scanning', () => {
        it('Shall have correct text, successful scan', () => {
            scooter.handleScan(null, 'test');

            expect(scooter.id).to.equal('test');
        })

        it('Shall have correct text, failed scan', () => {
            let error = scooter.handleScan('error', 'test');

            expect(error).to.equal('error');
        })
    })

    describe('Get data', () => {
        it('Get all scooters shall get correct data', async () => {
            await scooter.getAllScooters();

            expect(scooter.allScooters).to.be.an('array');
            expect(scooter.allScooters.length).to.equal(2);
            expect(scooter.allScooters[0].id).to.equal(1);
            expect(scooter.allScooters[1].id).to.equal(2);
        })

        it('Get all parkings shall get correct data', async () => {
            await scooter.getAllParkings();

            expect(scooter.allParkings).to.be.an('array');
            expect(scooter.allParkings.length).to.equal(2);
            expect(scooter.allParkings[0].id).to.equal(1);
            expect(scooter.allParkings[1].id).to.equal(2);
        })
    })

})
