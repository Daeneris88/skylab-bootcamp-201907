const mongoose = require('mongoose')
const logic = require('../..')
const { expect } = require('chai')
const { User, Card } = require('../../../models')

describe('logic - register card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let number, expiry, name, surname, email, password, id

    beforeEach(() => {
        let date = new Date()

        number = `${Math.random()}`
        expiry = ("0" + (date.getMonth() + 1)).slice(-2) + "/" + (date.getFullYear().toString()).slice(-2)

        return Card.deleteMany()

            .then(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@mail.com`
                password = `password-${Math.random()}`

                return User.deleteMany()
                    .then(() => User.create({ name, surname, email, password })
                        .then(user => id = user.id))
            })
    })

    it('should succeed on correct data', () =>
        logic.registerCard(id, number, expiry)
            .then(cardId => {
                expect(cardId).to.exist
                return User.findOne({ "cards._id": cardId })
            })
            .then(user => {
                expect(user).to.exist
                expect(user.cards[0].number).to.equal(number)
                expect(user.cards[0].expiry).to.equal(expiry)
            })
    )
    it('should fail if the card already exists', () => {
        card = new Card({ number, expiry })
        return User.findById(id)
            .then(user => user.save(card))

            .then(() => logic.registerCard(id, number, expiry)
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal(`Card already exists.`)
                })
            )
    })



    it('should fail on unexisting user', () =>
        logic.registerCard('5d5d5530531d455f75da9fF9', number, expiry)
            .catch(({ message }) => expect(message).to.equal(`User does not exists.`))
    )

    it('should fail on existing card', () =>
        logic.registerCard(id, number, expiry)
            .then(() => logic.registerCard(id, number, expiry))
            .catch(({ message }) => expect(message).to.equal('Card already exists'))
    )

    it('should fail on empty user id', () =>
        expect(() => logic.registerCard("", number, expiry)).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() => logic.registerCard(123, number, expiry)).to.throw('user id with value 123 is not a string')
    )

    it('should fail on empty number', () =>
        expect(() => logic.registerCard(id, "", expiry)).to.throw('number is empty or blank')
    )

    after(() => mongoose.disconnect())
})
