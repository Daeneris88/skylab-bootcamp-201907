const validate = require('../../../utils/validate')
const { Vehicle, User } = require('../../../models')

/**
 * 
 * @param {*} id
 * @param {*} fieldsToUpdate 
 * 
* @returns {Promise}
*/

module.exports = function(id, plate, data) {
    validate.string(id, 'user id')
    validate.string(plate, 'plate')

    return User.findById(id)
        .then (user => {
            if(!user) throw new Error ('wrong credentials')
            else{
                return Vehicle.findOne({ plate: plate })
                .then(vehicle => {
                    if(!vehicle) throw new Error(`vehicle with plate ${plate} does not exist`)
                    if(!vehicle.owner.includes(id)) throw new Error(`user with id ${id} is not the owner of vehicle with plate ${plate}`)
                    else return Vehicle.updateOne({ _id: vehicle._id } , { $set: data })
                })
            }
        })
}