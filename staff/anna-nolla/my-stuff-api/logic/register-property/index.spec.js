const { expect } = require('chai')
const logic = require('..')
const { User, Property } = require('../../data')
const mongoose = require('mongoose')

describe('logic - register proprty', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id, address, m2, year, cadastre, owner

    beforeEach(() => {
        address = `address-${Math.random()}`
        m2 = `m2-${Math.random()}`
        year = `date-${Math.random(1000, 2000)}`
        cadastre = `cadastre-${Math.random()}`

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`


        return ( Property.deleteMany(), User.deleteMany() )
            .then(() => User.create({ name, surname, email, password })
                .then(user => id = user.id))
    })

    it('should succeed on correct data', () => {
        owner = id

        logic.registerProperty(address, m2, year, cadastre, owner)
            .then(result => {
                expect(result).not.to.exist

                return User.findOne({ email })
            })
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
            })
            .then(() =>{
                return Property.findOne({ cadastre })
            })
            .then(property => {
                expect(property).to.exist
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
                expect(property.owner).to.equal(owner)
            })
    })
    // it('should fail if the mail already exists', () =>
    
    //     User.create({ name, surname, email, password })
    //         .then (() => logic.registerUser(name, surname, email, password)
    //             .catch( error =>{
    //                 expect(error).to.exist
    //                 expect(error.message).to.equal(`user with e-mail ${email} already exists`)
    //             })
    //         )
    // )

    after(() => mongoose.disconnect())
})