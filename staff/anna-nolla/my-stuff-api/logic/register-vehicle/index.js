const { Car, User } = require('../../data')
const validate = require('../../utils/validate')

/**
 * Registers a property.
 * 
 * @param {string} brand
 * @param {string} model
 * @param {number} year 
 * @param {string} type
 * @param {string} color
 * @param {boolean} electric
 * @param {string} owner
 * 
 * @returns {Promise}
 */

 module.exports = function (brand, model, year, type, color, electric, owner) {
    validate.string(brand, 'brand')
    validate.string(model, 'model')
    //validate year
    validate.string(type, 'type')
    validate.string(color, 'color')
    validate.string(owner, 'owner')

    return User.findOne(owner)
        .then(user => {
            if (!user) throw new Error('There is no registered user')
            return Car.findOne(cadastre)  
        })
        .then(vehicle => {
            if (!vehicle) Car.create({ brand, model, year, type, color, electric, owner })
            else throw new Error('This vehicle is already registered')
        })
}