const mongoose = require('mongoose')
const logic = require('../../../logic')
const { expect } = require('chai')
const { User, Property } = require('../../../models')

describe('logic - register property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let address, m2, year, cadastre, id

    beforeEach( async () => {

        address = `address-${Math.random()}`
        m2 = Number(Math.random())
        year = Number((Math.random() * 1000).toFixed())
        cadastre = `cad-${Math.random()}`

        await Property.deleteMany()
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@email.com`
            password = `123-${Math.random()}`

            await User.deleteMany()
                const user = await User.create({ name, surname, email, password })
                    id = user.id
            })

    it('should succeed on correct data', async () =>{
        const result = await logic.registerProperty(address, m2, year, cadastre, id)
            expect(result).to.exist
            const property = await Property.findOne({ cadastre })
                expect(property).to.exist
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
                expect(property.id).to.exist
                expect(property.owners.toString()).to.equal(id)
            })

    it('should fail if the property already exists', async () =>{
        await Property.create({ address, m2, year, cadastre })
            try {
                await logic.registerProperty(address, m2, year, cadastre, id)
            }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`Property already exists.`)
            }
    })

    it('should fail on unexisting user', async () => {
        try{
            await logic.registerProperty(address, m2, year, cadastre, '5d5d5530531d455f75da9fF9')
        }catch({ message }){ 
            expect(message).to.equal('user with id 5d5d5530531d455f75da9fF9 does not exist')
        }
    })

    it('should fail on empty user id', () =>
        expect(() =>
            logic.registerProperty(address, m2, year, cadastre, '')
        ).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() =>
            logic.registerProperty(address, m2, year, cadastre, 123)
        ).to.throw('user id with value 123 is not a string')
    )

    it('should fail on empty address', () =>
        expect(() =>
            logic.registerProperty("", m2, year, cadastre, id)
        ).to.throw('address is empty or blank')
    )

    it('should fail on wrong address type', () =>
        expect(() =>
            logic.registerProperty(123, m2, year, cadastre, id)
        ).to.throw('address with value 123 is not a string')
    )

    it('should fail on empty m2', () =>
        expect(() =>
            logic.registerProperty(address, "", year, cadastre, id)
        ).to.throw('m2 with value  is not a number')
    )

    it('should fail on wrong m2 type', () =>
        expect(() =>
            logic.registerProperty(address, '123', year, cadastre, id)
        ).to.throw('m2 with value 123 is not a number')
    )

    it('should fail on empty year', () =>
        expect(() =>
            logic.registerProperty(address, m2, "", cadastre, id)
        ).to.throw('year with value  is not a number')
    )

    it('should fail on wrong year type', () =>
        expect(() =>
            logic.registerProperty(address, m2, "123", cadastre, id)
        ).to.throw('year with value 123 is not a number')
    )

    it('should fail on empty cadastre', () =>
        expect(() =>
            logic.registerProperty(address, m2, year, "", id)
        ).to.throw('cadastre is empty or blank')
    )

    it('should fail on wrong cadastre type', () =>
        expect(() =>
            logic.registerProperty(address, m2, year, 123, id)
        ).to.throw('cadastre with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})