const mongoose = require('mongoose')
const { expect } = require('chai')
const { User , Property } = require('../../../models')
const logic = require('../../.')

describe('logic - update property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let userId1 , userId2 , name, surname , email , password , address , m2 , year , cadastre , id2 , id3 , propertyId , updatedData

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        address = `address-${Math.random()}`
        m2 = Math.random()
        year = Math.random()
        cadastre = `cadastre-${Math.random()}`
        owners = []

        id0 = '5d618ad961578b67fbb70bb0'
        id1 = '5d618ad961578b67fbb70bb1'
        id2 = '5d618ad961578b67fbb70bb2'
        id3 = '5d618ad961578b67fbb70bb3'

        updatedData = {
            address : `address-${Math.random()}`,
            m2 : Math.random(),
            year : Math.random(),
            cadastre : cadastre,
            owners : [id2 , id3],
            extra : `extra-${Math.random()}`
        }

        return User.deleteMany()
            .then(() => Property.deleteMany())
            .then(() => User.create({ name , surname , email , password }))
            .then(user =>{
                userId1 = user.id
                const property = new Property({ address , m2 , year , cadastre })
                propertyId = property.id
                property.owners.push(userId1)
                return property.save()
            })
    })

    it('should succeed on correct data', () =>
        logic.updateProperty(userId1, propertyId , updatedData)
            .then(() => Property.findOne({ _id : propertyId }))
            .then(property => {
                expect(property).to.exist
                expect(property.address).to.equal(updatedData.address)
                expect(property.m2).to.equal(updatedData.m2)
                expect(property.year).to.equal(updatedData.year)
                expect(property.cadastre).to.equal(updatedData.cadastre)
                expect(property.owners).to.exist
                expect(property.owners[0].toString()).to.equal(id2)
                expect(property.owners[1].toString()).to.equal(id3)
                expect(property.extra).not.to.exist
            })
    )

    it('should fail on non-existing user', () => {
        return logic.updateProperty('5d5d5530531d455f75da9fF9' , propertyId , updatedData)
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('user with id 5d5d5530531d455f75da9fF9 does not exist'))
    })

    it('should fail on non-existing property', () => {
        return logic.updateProperty(userId1, '5d5d5530531d455f75da9fB8' , updatedData)
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`property with id 5d5d5530531d455f75da9fB8 does not exist`))
    })

    it("should fail on updating a property by a user who is not an owner" , () => {
        let _name = `name-${Math.random()}`
        let _surname = `surname-${Math.random()}`
        let _email = `email-${Math.random()}@domain.com`
        let _password = `password-${Math.random()}`

        return Promise.all([ User.create({ name , surname , email , password }) , User.create({ name : _name , surname : _surname , email : _email , password : _password }) ])
            .then(([user1 , user2]) =>{
                userId = user1.id
                userId2 = user2.id

                const property = new Property({ address, m2 , year , cadastre })
                propertyId = property.id
                property.owners.push(userId)

                return property.save()
            })
        .then(property => {
            logic.updateProperty(userId2 , property.id , updatedData) 
            .catch(({ message }) => {
                expect(message).to.equal(`user with id ${userId2} is not owner of property with id ${property.id}`)
            })
        })
    })

    it('should fail on empty user id', () => 
        expect(() => logic.updateProperty("", propertyId , updatedData)).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
         expect(() => logic.updateProperty(123, propertyId , updatedData)).to.throw('user id with value 123 is not a string')
    )
    
    it('should fail on empty property id', () => 
        expect(() => logic.updateProperty(userId1, "" , updatedData)).to.throw('property id is empty or blank')
    )
    
    it('should fail on wrong property id type', () => 
         expect(() => logic.updateProperty(userId1, 123 , updatedData)).to.throw('property id with value 123 is not a string')
    )
    
    // it('should fail on empty name', () => 
    //     expect(() => logic.updateProperty(userId1, propertyId , updatedData)).to.throw('name is empty or blank')
    // )
    
    // it('should fail on wrong name type', () => 
    //      expect(() => logic.updateProperty(userId1, propertyId , updatedData)).to.throw('name is empty or blank')
    // )

    after(() => mongoose.disconnect())
})