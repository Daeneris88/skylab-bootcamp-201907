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

    return (async () => { 
        const user = await User.findById(id)
            if(!user) throw new Error ('wrong credentials')
            else{
                const vehicle = await Vehicle.findOne({ plate: plate })
                    if(!vehicle) throw new Error(`vehicle with plate ${plate} does not exist`)
                    if(!vehicle.owner.includes(id)) throw new Error(`user with id ${id} is not the owner of vehicle with plate ${plate}`)
                    else return Vehicle.updateOne({ _id: vehicle._id } , { $set: data })
                }
    })()
}