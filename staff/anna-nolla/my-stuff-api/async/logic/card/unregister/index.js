const validate = require('../../../utils/validate')
const { User } = require('../../../models')

/**
 * Unregisters a card through the id
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id, number) {

    validate.string(id, 'id')
    validate.string(number, 'number')

    return User.findOne({ _id: id })
        .then(user => {
            if(!user) throw Error('There is no user with this id')
            else {
                const card = user.cards.findIndex(card => card.number === number)
                    if(card.length === 0) throw Error('This card does not exist')
                    else{ user.cards.splice(card)
                            user.save()
                        }
                }
        })
}