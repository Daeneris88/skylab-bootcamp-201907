const validate = require('../../../utils/validate')
const { Property, User } = require('../../../models')

/**
 * 
 * @param {*} id
 * @param {*} fieldsToUpdate 
 * 
* @returns {Promise}
*/

module.exports = function(id, propertyId, data) {
    validate.string(id, 'user id')
    validate.string(propertyId, 'property id')

    return User.findById(id)
        .then((user) => {
            if(!user) throw new Error (`user with id ${id} does not exist`)
            else{
                return Property.findById(propertyId)
                    .then((property) => {
                        if(!property) throw new Error(`property with id ${propertyId} does not exist`)
                        if(!property.owners.includes(id)) throw new Error(`user with id ${id} is not owner of property with id ${propertyId}`)
                        else return Property.updateOne({ _id : property._id } , { $set: data })
                    })
            }
        })
}