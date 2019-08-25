const { expect } = require('chai')
const logic = require('..')
const { User, Property } = require('../../data')
const mongoose = require('mongoose')

describe('logic - register proprty', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id, brand, model, year, type, color, electric, owner

    beforeEach(() => {
        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = `date-${Math.random(1000, 2000)}`
        type = `type-${Math.random()}`
        color = `color-${Math.random()}`
        electric = `electric-${Math.random()}`

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

        logic.registerCar(brand, model, year, type, color, electric, owner)
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
            .then(vehicle => {
                expect(vehicle).to.exist
                expect(vehicle.brand).to.equal(brand)
                expect(vehicle.model).to.equal(model)
                expect(vehicle.year).to.equal(year)
                expect(vehicle.type).to.equal(type)
                expect(vehicle.color).to.equal(color)
                expect(vehicle.electric).to.equal(electric)
                expect(vehicle.owner).to.equal(owner)
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