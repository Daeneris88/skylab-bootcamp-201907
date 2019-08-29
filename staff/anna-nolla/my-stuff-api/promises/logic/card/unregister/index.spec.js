const mongoose = require('mongoose')
const logic = require('../..')
const { expect } = require('chai')
const { User, Card } = require('../../../models')

describe('logic - unregister card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let number, expiry, name, surname, email, password, id, card

    beforeEach(() => {
        let date = new Date()

        number = `${Math.random()}`
        expiry = ("0" + (date.getMonth() + 1)).slice(-2) + "/" + (date.getFullYear().toString()).slice(-2)

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        return User.deleteMany()
        .then(() => {
                card = new Card({ number, expiry })
                return User.create({ name, surname, email, password, 'cards': card })
                    .then(user => id = user.id)
        }) 
    })      
    
    it('should succeed on correct data', () =>{
        debugger 
        return logic.unregisterCard(id, number)
            .then(card => 
                expect(card).not.to.exist
            )
        })
    it('should fail if the user card does not exist', () => {
        number = "0.9343650890953465"
        return logic.unregisterCard(id, number)
            .then(res => expect(res).not.to.exist)
            .catch(error => {
                expect(error).to.exist
                expect(error.message).to.equal(`This card does not exist`)
            })
    })

    it("should fail on unexisting user" , () => {
        logic.unregisterCard('5d5d5530531d455f75da9fF9' , number)
            .catch(({ message }) => expect(message).to.equal('There is no user with this id'))
    })

    it('should fail on empty user id', () => 
        expect(() => logic.unregisterCard("" , number)).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => logic.unregisterCard(123 , number)).to.throw('user id with value 123 is not a string')
    )
    
    it('should fail on empty card id', () => 
        expect(() => logic.unregisterCard(id , "")).to.throw('number is empty or blank')
    )
    
    it('should fail on wrong card id type', () => 
        expect(() => logic.unregisterCard(id , 123)).to.throw('number with value 123 is not a string')
    )
    after(() => mongoose.disconnect())
})
