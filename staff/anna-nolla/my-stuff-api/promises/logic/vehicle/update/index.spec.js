const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Vehicle } = require('../../../models')

describe('logic - update vehicle', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

     let userId1, name, surname, email, password, make, model, year, type, color, plate, electric
     let types = [ 'suv', 'van', 'coupe', 'cabrio', 'roadster', 'truck']

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        make = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = Math.random()
        type = types[ Math.floor( Math.random() * types.length ) ]
        color = `color-${Math.random()}`
        plate = `plate-${Math.random()}`
        electric = Boolean(Math.round(Math.random()))

        updatedData = {
            make : `Volkswagen`,
            model : `model-${Math.random()}`,
            year : 1975,
            type : types[ Math.floor( Math.random() * types.length ) ],
            color : `color-${Math.random()}`,
            electric: Boolean(Math.round(Math.random())),
            plate : plate
        }

        return User.deleteMany()
            .then(() => Vehicle.deleteMany())
            .then(() => User.create({ name, surname, email, password }))
            .then(user =>{
                userId1 = user.id
                const vehicle = new Vehicle({ make, model, year, type, color, electric, plate })
                vehicle.owner.push(userId1)
                return vehicle.save()
            })
    })

    it('should succeed on correct data', () =>
        logic.updateVehicle(userId1, plate , updatedData)
            .then(result =>{
                 expect(result.nModified).to.exist
                 return Vehicle.findOne({ plate })
            })
            .then(vehicle => {
                expect(vehicle).to.exist
                expect(vehicle.make).to.equal(updatedData.make)
                expect(vehicle.model).to.equal(updatedData.model)
                expect(vehicle.year).to.equal(updatedData.year)
                expect(vehicle.type).to.equal(updatedData.type)
                expect(vehicle.color).to.equal(updatedData.color)
                expect(vehicle.electric).to.equal(updatedData.electric)
                expect(vehicle.plate).to.equal(updatedData.plate)
                expect(vehicle.owner).to.exist
                expect(vehicle.owner[0].toString()).to.equal(userId1.toString())
                expect(vehicle.extra).not.to.exist
            })
    )

    it('should fail on non-existing user', () => {
        userId1 = '5d5d5530531d455f75da9fF9'

        return logic.updateVehicle(userId1, plate , updatedData)
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`wrong credentials`))
    })
    
    it('should fail on non-existing vehicle', () => {
        return logic.updateVehicle(userId1, '123' , updatedData)
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`vehicle with plate 123 does not exist`))
    })

    it('should fail on empty user id', () => 
        expect(() => logic.updateVehicle("", plate , updatedData)).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => logic.updateVehicle(123, plate , updatedData)).to.throw('user id with value 123 is not a string')
    )
    
    it('should fail on empty plate', () => 
        expect(() => logic.updateVehicle(userId1, "" , updatedData)).to.throw('plate is empty or blank')
    )
    
    it('should fail on wrong plate type', () => 
        expect(() => logic.updateVehicle(userId1, 123 , updatedData)).to.throw('plate with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})