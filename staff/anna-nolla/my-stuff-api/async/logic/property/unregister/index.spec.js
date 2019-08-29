const mongoose = require('mongoose')
const { expect } = require('chai')
const { User , Property } = require('../../../models')
const logic = require('../../.')

describe('logic - unregister property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let id , id2 , name , surname , email , password , propertyId , address , m2 , year , cadastre

    beforeEach( async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        address = `adress-${Math.random()}`
        m2 = Math.random()
        year = Math.random()
        cadastre = `cadastre-${Math.random()}`

        await User.deleteMany()
            const user = await User.create({ name , surname , email , password })
                id = user.id
            await Property.deleteMany()
                const property = new Property({ address, m2 , year , cadastre })
                propertyId = property.id
                property.owners.push(id)
                return property.save()
    })

    it('should succeed on correct data', async () => {
        await logic.unregisterProperty(propertyId , id)
            const property = await Property.findOne({ propertyId })
                expect(property).not.to.exist
    })

    it('should fail on right cadastre and unexisting user', async () => {
        try{
            await logic.unregisterProperty(propertyId , '5d5d5530531d455f75da9fF9')
            throw Error('should not reach this point') 
        }catch({ message }) {
            expect(message).to.equal(`user with id 5d5d5530531d455f75da9fF9 does not exist`)
        }
    })

    it('should fail on existing user, but wrong property id', async () => {
        try {
            await logic.unregisterProperty('5d5d5530531d455f75da9fF9' , id)
            throw Error('should not reach this point')
        }catch({ message }) { 
            expect(message).to.equal('property with id 5d5d5530531d455f75da9fF9 does not exist')
        }
    })
    
    it('should fail on existing more than one owner on property', async () => {
        await User.deleteMany()
            const user = await User.create({ name , surname , email , password })
                id = user.id
                await Property.deleteMany()
                    const property = new Property({ address, m2 , year , cadastre })
                    property.owners.push(id , '5d5d5530531d455f75da9fF9')
                    await property.save()
            try{
                await logic.unregisterProperty(property.id , id)
                throw Error('should not reach this point')
            }catch({ message }) {
                expect(message).to.equal('invalid action: there are two or more owners for this property')
        }
    })

    it("should fail on unregistering a property by a user who is not an owner" , async () => {
        let _name = `name-${Math.random()}`
        let _surname = `surname-${Math.random()}`
        let _email = `email-${Math.random()}@domain.com`
        let _password = `password-${Math.random()}`

        const user1 = await User.create({ name , surname , email, password })
        const user2 = await User.create({ name: _name , surname: _surname , email: _email, password: _password })
            id = user1.id
            id2 = user2.id

            const property = new Property({ address, m2 , year , cadastre })
            propertyId = property.id
            property.owners.push(id)
            await property.save()
            
        try{
            await logic.unregisterProperty( propertyId , id2 ) 
        }catch({ message }) {
                expect(message).to.equal(`user with id ${id2} is not owner of property with id ${propertyId}`)
        }
    })
    
    it('should fail on empty property id', () => 
        expect(() => logic.unregisterProperty("" , id)).to.throw('property id is empty or blank')
    )
    
    it('should fail on wrong property id type', () => 
        expect(() => logic.unregisterProperty(123 , id)).to.throw('property id with value 123 is not a string')
    )

    it('should fail on empty user id', () => 
        expect(() => logic.unregisterProperty(propertyId , "")).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => logic.unregisterProperty(propertyId , 123)).to.throw('user id with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})