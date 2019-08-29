const { expect } = require('chai')
const logic = require('../../.')
const { User } = require('../../../models')
const mongoose = require('mongoose')

describe('logic - retrieve user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => id = user.id)
    })

    it('should succeed on correct data', () =>
        logic.retrieveUser(id)
            .then(user => {
                expect(user).to.exist
                expect(user.id).to.equal(id)
                expect(user._id).not.to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).not.to.exist
            })
    )
    it('should throw an error with a wrong id', () =>
        logic.retrieveUser("5d5fe532b4f3f827e6fc64f8")
            .catch(error => {
                expect(error).to.exist
                expect(error.message).to.equal(`user with id 5d5fe532b4f3f827e6fc64f8 not found`)
            })
    )

    it('should fail on empty user id', () =>
        expect(() => logic.retrieveUser("")).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() => logic.retrieveUser(123)).to.throw('user id with value 123 is not a string')
    )
    after(() => mongoose.disconnect())
})