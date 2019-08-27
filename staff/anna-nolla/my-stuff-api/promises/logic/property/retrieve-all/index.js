const validate = require('../../../utils/validate')
const { Property, User } = require('../../../models')

/**
 * 
 * @param {*} id 
 * 
 * @returns {Promise}
*/

module.exports = function(id) {
    
    validate.string(id, 'User id')

    return User.findById(id)
     .then (user => {  
        if(!user) throw Error('This user id does not exist.') 
        else {
            debugger
            return Property.find({ 'owners': id }).lean()
            .then(properties => {
                if (!properties) throw Error(`User with id ${id} does not own any properties.`)
                else {
                    properties.forEach((property, index) => {
                        properties[index].id = property._id.toString()
                        property.owners.forEach((item , numb) => {
                            return property.owners[numb] = item.toString()
                        })                        
                })
                return properties
            }
            })
        }
     })
}