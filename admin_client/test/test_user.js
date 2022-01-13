
let chai = require('chai')
let expect = chai.expect;
const user = require('./../www/js/models/user.js').default


describe("User", () => {
    describe("Before signing in", () => {
        it('CurrentUser shall be an empty object', async () => {
            expect(user.currentUser).to.be.an('object').that.is.empty;
        })
        it('Authorized shall be false', async () => {
            expect(user.authorized).to.be.equal(false)
        })
    })
    describe("After signing in", () => {
        before( async () =>  {
            let id = "00000000"
            await user.login(id);
        })

        after(() => {
            user.authorized = false
        })
        it('Authorized shall be false', () => {
            expect(user.authorized).to.be.equal(true)
        })
    })
})
