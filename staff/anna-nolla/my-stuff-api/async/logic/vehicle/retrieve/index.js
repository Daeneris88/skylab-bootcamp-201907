const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../models')

/**
 * 
 * @param {*} id 
 * 
 * @returns {Promise}
*/
// falta logica ! ! ! mira el retrieve property
module.exports = function(vehicleId) {
    validate.string(vehicleId, 'Vehicle id')

    return (async () => { 
        const vehicle = await Vehicle.findById(vehicleId).lean()
            if (!vehicle) throw Error(`Vehicle with id ${vehicleId} does not exist.`)
            else {
                vehicle.id = vehicleId 
                return vehicle
            }
    })()
}