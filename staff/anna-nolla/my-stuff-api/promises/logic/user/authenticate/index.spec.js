const { expect } = require('chai')
const logic = require('../../.')
const { User } = require('../../../models')
const mongoose = require('mongoose')


describe('logic - authenticate user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password })
                .then(user => id = user.id))
    })

    it('should succeed on correct data', () =>
        logic.authenticateUser(email, password)
            .then(_id => {
                expect(_id).to.exist
                expect(_id).to.be.a('string')
                expect(_id).to.equal(id)
            })
    )
    it('should fail on incorrect mail', () =>
        logic.authenticateUser("pepito@mail.com", password)
            .catch(error => {
                expect(error).to.exist
                expect(error.message).to.equal('Wrong credentials.')
            })
    )
    it('should fail on wrong password', () =>
        logic.authenticateUser(email, "123")
            .catch(error => {
                expect(error).to.exist
                expect(error.message).to.equal('Wrong credentials.')
            })
    )

    it('should fail on empty email', () =>
        expect(() => logic.authenticateUser("", password)).to.throw('email is empty or blank')
    )

    it('should fail on wrong email type', () =>
        expect(() => logic.authenticateUser("123", password)).to.throw('email with value 123 is not a valid e-mail')
    )

    it('should fail on wrong password type', () =>
        expect(() => logic.authenticateUser(123, password)).to.throw('email with value 123 is not a string')
    )

    it('should fail on empty password', () =>
        expect(() => logic.authenticateUser(email, "")).to.throw('password is empty or blank')
    )

    it('should fail on wrong password type', () =>
        expect(() => logic.authenticateUser(email, 123)).to.throw('password with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})