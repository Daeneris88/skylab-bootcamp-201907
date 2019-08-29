const mongoose = require('mongoose')
const { expect } = require('chai')
const { Vehicle, User } = require('../../../models')
const logic = require('../../.')

describe('logic - unregister vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let userId , userId2 , name , surname , email , password , vehicleId , make , model , year , type , color , plate, electric
    let types = [ 'suv' , 'van' , 'coupe' , 'cabrio' , 'roadster' , 'truck']

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
        electric = Boolean(Math.round(Math.random()))
        plate = `vehplate-${Math.random()}`

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user =>{
                userId = user.id
                return Vehicle.deleteMany()
            })
            .then(() => {
                const vehicle = new Vehicle({ make, model, year, type, color, electric, plate })
                vehicleId = vehicle.id
                vehicle.owner.push(userId)
                return vehicle.save()
            })
    })

    it('should succeed on correct data', () =>
        logic.unregisterVehicle(vehicleId , userId)
            .then(() => Vehicle.findOne({ vehicleId }))
            .then(vehicle => {
                expect(vehicle).not.to.exist
            })
    )

    it('should fail on right vehicle and unexisting user', () =>
        logic.unregisterVehicle(vehicleId , '5d5d5530531d455f75da9fF9')
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('user with id 5d5d5530531d455f75da9fF9 does not exist'))
    )

    it('should fail on existing user and unexisting vehicle', () =>{
        return logic.unregisterVehicle('5d5d5530531d455f75da9fF9' , userId)
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('vehicle with id 5d5d5530531d455f75da9fF9 does not exist'))

    })

    it("should fail on unregistering a vehicle by a user who is not an owner" , () => {
        let _name = `name-${Math.random()}`
        let _surname = `surname-${Math.random()}`
        let _email = `email-${Math.random()}@domain.com`
        let _password = `password-${Math.random()}`

        return Promise.all([ User.create({ name , surname , email , password }) , User.create({ name : _name , surname : _surname , email : _email , password : _password }) ])
            .then(([user1 , user2]) =>{
                userId = user1.id
                userId2 = user2.id
                const vehicle = new Vehicle({ make , model , year , type , color , electric, plate })
                vehicleId = vehicle.id
                vehicle.owner.push(userId)
                return vehicle.save()
            })
        .then(vehicle => {
            logic.unregisterVehicle( vehicle.id , userId2 ) 
            .catch(({ message }) => {
                expect(message).to.equal(`user with id ${userId2} is not owner of vehicle with id ${vehicle.id}`)
            })
        })
    })

    it('should fail on empty vehicle id', () => 
        expect(() => logic.unregisterVehicle("" , userId)).to.throw('Vehicle id is empty or blank')
    )
    
    it('should fail on wrong vehicle id type', () => 
        expect(() => logic.unregisterVehicle(123 , userId)).to.throw('Vehicle id with value 123 is not a string')
    )
    
    it('should fail on empty user id', () => 
        expect(() => logic.unregisterVehicle(vehicleId , "")).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => logic.unregisterVehicle(vehicleId , 123)).to.throw('user id with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})