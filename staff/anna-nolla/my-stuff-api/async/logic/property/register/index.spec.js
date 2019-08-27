const mongoose = require('mongoose')
const logic = require('../../../logic')
const { expect } = require('chai')
const { User, Property } = require('../../../models')

describe('logic - register property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let address, m2, year, cadastre, id

    beforeEach(() => {

        address = `address-${Math.random()}`
        m2 = Number(Math.random())
        year = Number((Math.random()*1000).toFixed())
        cadastre = `cad-${Math.random()}`
    
       
        return Property.deleteMany()
            .then(() => {
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`

                return User.deleteMany()
                    .then(() => User.create({ name, surname, email, password })
                        .then(user => id = user.id))
            })
    })

    it('should succeed on correct data', () =>
        logic.registerProperty(address, m2, year, cadastre, id)
            .then( property => {
                expect(property).to.exist
                return Property.findOne({ cadastre })
            })
            .then( property => {
                expect(property).to.exist
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
                expect(property.id).to.exist
                expect(property.owners.toString()).to.equal(id)
            })
    )
    it('should fail if the property already exists', () =>
       Property.create({ address, m2, year, cadastre })
           .then (() => logic.registerProperty(address, m2, year, cadastre, id)
               .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal(`Property already exists.`)
               })
           )
    )
})