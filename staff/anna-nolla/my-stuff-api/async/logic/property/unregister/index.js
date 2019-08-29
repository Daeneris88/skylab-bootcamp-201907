const validate = require('../../../utils/validate')
const { Property, User } = require('../../../models')

/**
 * Unregisters a user by their id
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
*/

module.exports = function(propertyId, id) {
    validate.string(propertyId, 'property id')
    validate.string(id, 'user id')

    return (async () => { 
        const user = await User.findById(id)
            if(!user) throw new Error(`user with id ${id} does not exist`)
            else{
                const property = await Property.findById(propertyId)        
                    if(!property) throw new Error(`property with id ${propertyId} does not exist`)
                    else{
                        if(!property.owners.includes(id)) throw new Error(`user with id ${id} is not owner of property with id ${propertyId}`)
                        if(property.owners.length > 1) throw new Error(`invalid action: there are two or more owners for this property`)
                        else  Property.deleteOne({ _id: propertyId })
                    }
            }
    })()
}