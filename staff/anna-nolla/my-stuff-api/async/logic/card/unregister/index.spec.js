const mongoose = require('mongoose')
const logic = require('../..')
const { expect } = require('chai')
const { User, Card } = require('../../../models')

describe('logic - unregister card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let number, expiry, name, surname, email, password, id, card

    beforeEach( async () => {
        let date = new Date()

        number = `${Math.random()}`
        expiry = ("0" + (date.getMonth() + 1)).slice(-2) + "/" + (date.getFullYear().toString()).slice(-2)

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
            card = new Card({ number, expiry })
            const user = await User.create({ name, surname, email, password, 'cards': card })
                id = user.id
    })      
    
    it('should succeed on correct data', async () =>{
        const card = await logic.unregisterCard(id, number)
            expect(card).not.to.exist
    })
    
    it('should fail if the user card does not exist', async () => {
        number = "0.9343650890953465"
        try {
            const res = await logic.unregisterCard(id, number)
                expect(res).not.to.exist
        }catch (error){
                expect(error).to.exist
                expect(error.message).to.equal(`This card does not exist`)
        }
    })

    it("should fail on unexisting user" , async () => {
        try{
            await logic.unregisterCard('5d5d5530531d455f75da9fF9' , number)
        }catch ({ message }) {
            expect(message).to.equal('There is no user with this id')
        }
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
