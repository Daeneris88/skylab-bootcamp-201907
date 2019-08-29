const validate = require('../../../utils/validate')
const { User, Card } = require('../../../models')

/**
 * 
 * @param {*} number
 * @returns {Promise}
 * 
*/

module.exports = function(id) {
    
    validate.string(id, 'id')
    let card = []

    return (async () => {        
        const user = await User.findById(id)
            if (!user) throw Error(`This user does not exist.`)
            else {
                if (user.cards.length === 0) throw Error(`This user does not have cards`) 
                else {
                    user.cards.forEach((item) => {
                        card.push({ 'number': item.number, 'expiry': item.expiry})
                    })
                    return card
                }
            }    
    })()
}