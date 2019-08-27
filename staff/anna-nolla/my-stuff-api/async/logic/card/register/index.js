const validate = require('../../../utils/validate')
const { User, Card } = require('../../../models')

/**
 * 
 * @param {string} id 
 * @param {number} number 
 * @param {String} expiry 
 * 
 * @returns {Promise}
 */

module.exports = function(id, number, expiry) {
    let _user, cardId

    validate.string(id, 'id')
    validate.string(number, 'number')
    validate.string(expiry, 'expiry date')
    
    return User.findById(id)
        .then(user => {
            if (!user) throw Error('User does not exists.')
            const card = user.cards.find(card => card.number === number)
            if (card) throw Error('Card already exists')
            _user = user
            const newCard = new Card({ number, expiry })
            cardId = newCard.id
            _user.cards.push(newCard)
            return _user.save()
        })
        .then(() => cardId)
}