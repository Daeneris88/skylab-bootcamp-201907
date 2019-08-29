const mongoose = require('mongoose')
const logic = require('../..')
const { expect } = require('chai')
const { User, Property } = require('../../../models')

describe('logic - retrieve property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id, address, m2, year, cadastre, propertyId

    beforeEach(() => {
        address = `address-${Math.random()}`
        m2 = Number(Math.random())
        year = Number((Math.random() * 1000).toFixed())
        cadastre = `cad-${Math.random()}`

        return Property.deleteMany()
            .then(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@mail.com`
                password = `password-${Math.random()}`

                return User.deleteMany()
                    .then(() => {
                        return User.create({ name, surname, email, password })
                            .then(user => id = user.id)
                    })
                    .then(() => {
                        return Property.create({ address, m2, year, cadastre, 'owners': id })
                            .then(property => propertyId = property.id)
                    })
            })
    })

    it('should succeed on correct data', () =>
        logic.retrieveProperty(propertyId)
            .then(property => {
                expect(property).to.exist
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
                expect(property.owners[0]).to.equal(id)
            })
    )
    it('should fail if there are no properties', () =>
        logic.retrieveProperty('5d65115f8f58cc540cc376ca')
            .then(res => expect(res).not.to.exist)
            .catch(error => {
                expect(error).to.exist
                expect(error.message).to.equal(`Property with id 5d65115f8f58cc540cc376ca does not exist.`)
            })
    )

    it('should fail on empty property id', () =>
        expect(() => logic.retrieveProperty("")).to.throw('property id is empty or blank')
    )

    it('should fail on wrong surname type', () =>
        expect(() => logic.retrieveProperty(123)).to.throw('property id with value 123 is not a string')
    )
    after(() => mongoose.disconnect())
})
