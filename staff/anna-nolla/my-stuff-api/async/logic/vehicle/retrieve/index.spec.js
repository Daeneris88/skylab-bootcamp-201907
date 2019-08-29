const mongoose = require('mongoose')
const { expect } = require('chai')
const { Vehicle } = require('../../../models')
const logic = require('../../.')

describe('logic - retrieve vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let make , model , year , type , color , electric, plate , vehicleId
    let types = [ 'suv' , 'van' , 'coupe' , 'cabrio' , 'roadster' , 'truck']

    beforeEach( async () => {
        make = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = Math.random()
        type = types[ Math.floor( Math.random() * types.length ) ]
        color = `color-${Math.random()}`
        electric = Boolean(Math.round(Math.random()))
        plate = `license-${Math.random()}`
        id0 = "5d618ad961578b67fbb70bb7"

        await Vehicle.deleteMany()
            const vehicle = new Vehicle({ make , model , year , type , color , electric, plate })
            vehicleId = vehicle.id
            vehicle.owner.push(id0)
            return vehicle.save()
    })

    it('should succeed on correct data', async () => {
        const vehicle = await logic.retrieveVehicle(vehicleId)
            expect(vehicle).to.exist
            expect(vehicle.model).to.equal(model)
            expect(vehicle.year).to.equal(year)
            expect(vehicle.type).to.equal(type)
            expect(vehicle.color).to.equal(color)
            expect(vehicle.electric).to.equal(electric)
            expect(vehicle.plate).to.equal(plate)
            expect(vehicle.owner).to.exist
            expect(vehicle.owner[0].toString()).to.equal(id0) //esto es una chapuza mira el retirve the properties
            expect(vehicle.make).to.equal(make)

    })
    
    it('should fail on wrong vehicle id', async () => {
        try {
            await logic.retrieveVehicle('5d5d5530531d455f75da9fF9')
        }catch({ message }) {
            expect(message).to.equal('Vehicle with id 5d5d5530531d455f75da9fF9 does not exist.')
        }
    })

    it('should fail on empty vehicle id', () => 
        expect(() => logic.retrieveVehicle("")).to.throw('Vehicle id is empty or blank')
    )
    
    it('should fail on wrong vehicle id type', () => 
        expect(() => logic.retrieveVehicle(123)).to.throw('Vehicle id with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})