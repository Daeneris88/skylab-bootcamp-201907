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

    validate.string(id, 'user id')
    validate.string(number, 'number')
    validate.string(expiry, 'expiry date')

    return (async () => {  
        const user = await User.findById(id)
            if (!user) throw Error('User does not exists.')
            else {
                const card = await user.cards.find(card => card.number === number)
                    if (card) throw Error('Card already exists')
                    else {
                        const newCard = new Card({ number, expiry })
                        cardId = newCard.id
                        user.cards.push(newCard)
                        await user.save()
                        return cardId
                }
            }
    })()
}