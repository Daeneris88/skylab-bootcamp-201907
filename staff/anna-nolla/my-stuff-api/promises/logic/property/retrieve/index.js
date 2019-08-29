const validate = require('../../../utils/validate')
const { Property } = require('../../../models')


/**
 * 
 * @param {*} id
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'property id')

    return Property.findById(id).lean()
        .then(property => {
            if (!property) throw Error(`Property with id ${id} does not exist.`)
            else {
                property.owners.forEach((item , index) => {
                    return property.owners[index] = item.toString()
                })
                return property
            }
        })
}