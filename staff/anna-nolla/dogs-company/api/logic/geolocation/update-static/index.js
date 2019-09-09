const { models: { User } } = require('data')
const { validate }= require('utils')

/**
 * Updates a user geolocation. (static)
 * 
 * @param {string} id 
 * @param {number} longitude 
 * @param {number} latitude 
 * 
 * @returns {Promise}
 */

module.exports = function (id, longitude, latitude) {
    validate.string(id, 'user id')
    validate.number(longitude, 'longitude')
    validate.number(latitude, 'latitude')
   
    const static = { type: 'Point', coordinates: [longitude, latitude] }

    return (async () => {
        const user= await User.findById(id)
            if (!user) throw new Error(`User not found`)

            user.static = static
            user.static.id = user.static._id
            delete user.static._id

        await user.save()
    })()
}