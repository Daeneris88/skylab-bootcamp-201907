const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Vehicle } = require('../../../models')

describe('logic - register vehicle', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let make, model, year, type, color, electric, plate, id, vehicleId

    beforeEach(() => {
        const typeArray = ['sedan', 'cabrio', 'truck']

        make = `vehbrand-${Math.random()}`
        model = `vehmodel-${Math.random()}`
        year = Number((Math.random() * 1000).toFixed())
        type = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
        color = `vehcolor-${Math.random()}`
        electric = Boolean(Math.round(Math.random()))
        plate = `vehplate-${Math.random()}`

        return Vehicle.deleteMany()
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
        logic.registerCar(id, make, model, year, type, color, electric, plate)
            .then(result => {
                vehicleId = result
                expect(vehicleId).to.exist
                return Vehicle.findOne({ plate })
            })
            .then(vehicle => {
                expect(vehicle).to.exist
                expect(vehicle.id).to.equal(vehicleId)
                expect(vehicle.make).to.equal(make)
                expect(vehicle.model).to.equal(model)
                expect(vehicle.year).to.equal(year)
                expect(vehicle.type).to.equal(type)
                expect(vehicle.color).to.equal(color)
                expect(vehicle.electric).to.equal(electric)
            })
    )

    it('should fail if the vehicle already exists', () =>
        Vehicle.create({ make, model, year, type, color, electric, plate })
            .then(() => logic.registerCar(id, make, model, year, type, color, electric, plate)
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal(`Vehicle already exists.`)
                })
            )
    )

    it('should fail on empty make', () =>
        expect(() =>
            logic.registerCar(id, '', model, year, type, color, electric, plate)
        ).to.throw('make is empty or blank')
    )

    it('should fail on undefined make', () =>
        expect(() =>
            logic.registerCar(id, undefined, model, year, type, color, electric, plate)
        ).to.throw(`make with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerCar(id, 123, model, year, type, color, electric, plate)
        ).to.throw(`make with value 123 is not a string`)
    )

    it('should fail on empty model', () =>
        expect(() =>
            logic.registerCar(id, make, '', year, type, color, electric, plate)
        ).to.throw('model is empty or blank')
    )

    it('should fail on undefined model', () =>
        expect(() =>
            logic.registerCar(id, make, undefined, year, type, color, electric, plate)
        ).to.throw(`model with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerCar(id, make, 123, year, type, color, electric, plate)
        ).to.throw(`model with value 123 is not a string`)
    )

    it('should fail on empty year', () =>
        expect(() =>
            logic.registerCar(id, make, model, '', type, color, electric, plate)
        ).to.throw(`year with value  is not a number`)
    )

    it('should fail on undefined year', () =>
        expect(() =>
            logic.registerCar(id, make, model, undefined, type, color, electric, plate)
        ).to.throw(`year with value undefined is not a number`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerCar(id, make, model, 'year', type, color, electric, plate)
        ).to.throw(`year with value year is not a number`)
    )

    it('should fail on empty type', () =>
        expect(() =>
            logic.registerCar(id, make, model, year, '', color, electric, plate)
        ).to.throw('type is empty or blank')
    )

    it('should fail on undefined type', () =>
        expect(() =>
            logic.registerCar(id, make, model, year, undefined, color, electric, plate)
        ).to.throw(`type with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerCar(id, make, model, year, 123, color, electric, plate)
        ).to.throw(`type with value 123 is not a string`)
    )

    it('should fail on empty color', () =>
        expect(() =>
            logic.registerCar(id, make, model, year, type, '', electric, plate)
        ).to.throw('color is empty or blank')
    )

    it('should fail on undefined color', () =>
        expect(() =>
            logic.registerCar(id, make, model, year, type, undefined, electric, plate)
        ).to.throw(`color with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerCar(id, make, model, year, type, 123, electric, plate)
        ).to.throw(`color with value 123 is not a string`)
    )

    it('should fail on empty electric', () =>
        expect(() =>
            logic.registerCar(id, make, model, year, type, color, '', plate)
        ).to.throw('electric with value  is not a boolean')
    )

    it('should fail on undefined electric', () =>
        expect(() =>
            logic.registerCar(id, make, model, year, type, color, undefined, plate)
        ).to.throw(`electric with value undefined is not a boolean`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerCar(id, make, model, year, type, color, 123, plate)
        ).to.throw(`electric with value 123 is not a boolean`)
    )

    it('should fail on empty plate', () =>
        expect(() =>
            logic.registerCar(id, make, model, year, type, color, electric, '')
        ).to.throw('plate is empty or blank')
    )

    it('should fail on undefined plate', () =>
        expect(() =>
            logic.registerCar(id, make, model, year, type, color, electric, undefined)
        ).to.throw(`plate with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerCar(id, make, model, year, type, color, electric, 123)
        ).to.throw(`plate with value 123 is not a string`)
    )
    
    after(() => mongoose.disconnect())
})