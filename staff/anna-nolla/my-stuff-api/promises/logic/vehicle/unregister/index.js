const validate = require('../../../utils/validate')
const { Vehicle, User } = require('../../../models')

/**
 * Unregisters a user by their id
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
*/

module.exports = function(vehicleId, id) {

    validate.string(vehicleId, 'Vehicle id')
    validate.string(id, 'user id')

    return User.findById(id)
        .then(user => {
            if(!user) throw new Error (`user with id ${id} does not exist`)
            else{
                return Vehicle.findById(vehicleId)
                    .then(vehicle => {
                        if(!vehicle) throw new Error(`vehicle with id ${vehicleId} does not exist`)
                        else{
                            if(!vehicle.owner.includes(id)) throw new Error (`user with id ${id} is not owner of vehicle with id ${vehicleId}`)
                            else return Vehicle.deleteOne({ _id : vehicleId })
                        }
                    })
            }
        })
}