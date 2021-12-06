let chai = require('chai')
let expect = chai.expect;
const sinon = require("sinon");
import db from './../www/js/models/db';
import auth from './../www/js/models/auth';

describe("User", () => {
    let sandbox,
    getLoginDataStub,
    getUserStub,
    addUserStub;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        getLoginDataStub = sandbox.stub(auth, 'getLoginData');
        getUserStub = sandbox.stub(db, 'getUser');
        addUserStub = sandbox.stub(db, 'addUser');

        getLoginDataStub.returns({email: 'test@test', name: 'test test'})

        getUserStub.onCall(0).returns(null);
        getUserStub.onCall(1).returns({email: 'test@test', firstname: 'test', lastname: 'test'});

        addUserStub.returns({email: 'test@test.se', firstname: 'test', lastname: 'test'})
    })

    afterEach(() => {
        sandbox.restore();
    })
    describe("Initial state", () => {
        it("Authorize shoud be false", () => {
            expect(auth.authorized).to.be.false;
        })
        it("Current user shall be {}", () => {
            expect(auth.currentUser).to.be.an('object');
            expect(Object.keys(auth.currentUser).length).to.equal(0);
        })
    })

    describe("Login not registered", () => {
        it('Shall call the correct db functions', async () => {
            await auth.login(1);
            expect(getUserStub.calledTwice).to.be.true;
            expect(addUserStub.calledOnce).to.be.true;
            expect(getLoginDataStub.calledOnce).to.be.true;
        })

        it('Shall have the correct user data', () => {
            expect(auth.currentUser).to.be.an('object');
            expect(auth.currentUser.email).to.equal('test@test');
            expect(auth.currentUser.firstname).to.equal('test');
            expect(auth.currentUser.lastname).to.equal('test');
        })
    })

})
