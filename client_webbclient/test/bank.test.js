let chai = require('chai')
let expect = chai.expect;
const sinon = require("sinon");
import db from './../www/js/models/db';
import bank from './../www/js/models/bank';
import user from './../www/js/models/user';

describe("Bank", () => {
    let sandbox,
    getLoginDataStub,
    getUserStub,
    updateUserStub,
    updateLogPayedStub;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        getUserStub = sandbox.stub(db, 'getUser');
        updateUserStub = sandbox.stub(db, 'updateUser');
        updateLogPayedStub = sandbox.stub(db, 'updateLogPayed')

        getUserStub.onCall(0).returns({
            email: 'test@test',
            firstname: 'test',
            lastname: 'test',
            balance: 0
        });

        updateLogPayedStub.onCall(0).returns({
            id: 1,
            payed: 1
        })

        updateLogPayedStub.onCall(1).returns({
            id: 2,
            payed: 1
        })

        updateLogPayedStub.onCall(2).returns({
            id: 3,
            payed: 1
        })
    })

    afterEach(() => {
        sandbox.restore();
    })

    after(() => {
        bank.accounts = [
            {
                name: 'Lönekonto',
                clearing: '6896',
                account: '186 159 123',
                amount: 5687
            },
            {
                name: 'Buffertkonto',
                clearing: '6895',
                account: '186 669 333',
                amount: 28963
            },
            {
                name: 'ISK',
                clearing: '6897',
                account: '133 713 370',
                amount: 666
            }
        ],
        bank.transferAmount = '';
        bank.currentAmount = null;
        bank.currentAccount = 0;
        bank.errorMessage = null;

        user.currentUser = {}
    })
    describe("Initial state", () => {
        it("Payment methods shall be an array with two objects", () => {
            expect(bank.paymentMethods).to.be.an('array');
            expect(bank.paymentMethods.length).to.equal(2);
            expect(bank.paymentMethods[0]).to.be.an('object');
            expect(bank.paymentMethods[0].value).to.equal('Direct');
            expect(bank.paymentMethods[0].text).to.equal('Direkt');
            expect(bank.paymentMethods[1]).to.be.an('object');
            expect(bank.paymentMethods[1].value).to.equal('Monthly');
            expect(bank.paymentMethods[1].text).to.equal('Månad');
        })

        it("Accounts shall be an array with three objects", () => {
            expect(bank.accounts).to.be.an('array');
            expect(bank.accounts.length).to.equal(3);
            expect(bank.accounts[0]).to.be.an('object');
            expect(bank.accounts[0].name).to.equal('Lönekonto');
            expect(bank.accounts[0].clearing).to.equal('6896');
            expect(bank.accounts[0].account).to.equal('186 159 123');
            expect(bank.accounts[0].amount).to.equal(5687);
        })

        it('The transfer price shall be 600', () => {
            expect(bank.transferPrice).to.be.an('number');
            expect(bank.transferPrice).to.equal(600);
        })

        it('The transfer amount shall be an empty string', () => {
            expect(bank.transferAmount).to.be.an('string');
            expect(bank.transferAmount).to.equal('');
        })

        it('Shall have no current amount', () => {
            expect(bank.currentAmount).to.be.null;
        })

        it('Shall have account 0 ass current account', () => {
            expect(bank.currentAccount).to.be.an('number');
            expect(bank.currentAccount).to.equal(0);
        })

        it('Shall have no error message', () => {
            expect(bank.errorMessage).to.be.null;
        })
    })

    describe('Transfer', () => {
        it('Transfer successful', async () => {
            bank.transferAmount = '100';
            getUserStub.onCall(1).returns({
                email: 'test@test',
                firstname: 'test',
                lastname: 'test',
                balance: 100
            });
            updateUserStub.returns({
                email: 'test@test',
                firstname: 'test',
                lastname: 'test',
                balance: 100
            });

            await bank.transfer();

            expect(getUserStub.calledTwice).to.be.true;
            expect(updateUserStub.calledOnce).to.be.true;
            expect(bank.accounts[0].amount).to.equal(4987);
            expect(bank.transferAmount).to.equal('');
            expect(user.currentUser.balance).to.equal(100);
        })

        it('Transfer failed transfer amount bellow zero', async () => {
            bank.transferAmount = '-100';
            getUserStub.onCall(1).returns({
                email: 'test@test',
                firstname: 'test',
                lastname: 'test',
                balance: 100
            });
            updateUserStub.returns({
                email: 'test@test',
                firstname: 'test',
                lastname: 'test',
                balance: 100
            });

            await bank.transfer();

            let view = bank.errorMessage.view()[0]

            expect(getUserStub.calledOnce).to.be.true;
            expect(updateUserStub.notCalled).to.be.true;
            expect(bank.accounts[0].amount).to.equal(4387);
            expect(bank.transferAmount).to.equal('-100');
            expect(user.currentUser.balance).to.equal(0);

            // About the error message
            expect(view.tag).to.equal('fieldset');
            expect(view.children.length).to.equal(4);
            expect(view.children[0].tag).to.equal('legend');
            expect(view.children[0].text).to.equal('Error!');
            expect(view.children[1].tag).to.equal('p');
            expect(view.children[1].text).to.equal('För liten överföring!');
            expect(view.children[2].tag).to.equal('p');
            expect(view.children[2].text).to.equal(' Överföring måste vara större än 0!');
            expect(view.children[3].tag).to.equal('p');
            expect(view.children[3].text).to.equal(
                'Vi drar ändå vår avgift för att du slösar vår tid.'
            );
        })

        it('Transfer failed transfer amount to big', async () => {
            bank.transferAmount = '100';
            getUserStub.onCall(1).returns({
                email: 'test@test',
                firstname: 'test',
                lastname: 'test',
                balance: 0
            });
            updateUserStub.returns({
                email: 'test@test',
                firstname: 'test',
                lastname: 'test',
                balance: 0
            });
            bank.accounts[0].amount = 100;

            await bank.transfer();

            let view = bank.errorMessage.view()[0]

            expect(getUserStub.calledOnce).to.be.true;
            expect(updateUserStub.notCalled).to.be.true;
            expect(bank.accounts[0].amount).to.equal(0);
            expect(bank.transferAmount).to.equal('100');
            expect(user.currentUser.balance).to.equal(0);

            // About the error message
            expect(view.tag).to.equal('fieldset');
            expect(view.children.length).to.equal(4);
            expect(view.children[0].tag).to.equal('legend');
            expect(view.children[0].text).to.equal('Error!');
            expect(view.children[1].tag).to.equal('p');
            expect(view.children[1].text).to.equal('För stor överföring!');
            expect(view.children[2].tag).to.equal('p');
            expect(view.children[2].text).to.equal(`
                                    Högsta tillåtna överföring är
                                    0 SEK.
                                `
            );
            expect(view.children[3].tag).to.equal('p');
            expect(view.children[3].text).to.equal(
                'Vi drar ändå vår avgift för att du slösar vår tid.'
            );
        })
    })

    describe('Pay', () => {
        it('Pay an invoice with the value of 500', async () => {
            bank.currentAccount = 2;

            let invoice = [{id: 1, price: 200}, {id: 2, price: 50}, {id:3, price: 250}];

            await bank.pay(invoice);

            expect(updateLogPayedStub.calledThrice).to.be.true;
            expect(bank.accounts[2].amount).to.equal(166)
        })
    })
})
