const { Property, User } = require('../../data')
const validate = require('../../utils/validate')

/**
 * Registers a property.
 * 
 * @param {string} address
 * @param {number} m2 
 * @param {number} cadastre 
 * @param {string} owner
 * 
 * @returns {Promise}
 */

module.exports = function (address, m2, year, cadastre, owner) {
    validate.string(address, 'address')
    //validate m2 and year // we need validate num
    validate.string(cadastre, 'cadastre')
    validate.string(owner, 'owner')

    return User.findOne(owner)
        .then(user => {
            if (!user) throw new Error('There is no registered user')
            const property =  Property.findOne(cadastre)
            return { user, property }
        })
        .then(({ user, property }) => {
            if (!property) Property.create({ address, m2, year, cadastre, owner })
            else {
                if (property.owners.includes(user.id)) throw new Error('you are already registered in this property')
                else property.owners.push(user.id)
            }
        })
}





    // return Property.findOne({ cadastre })
    //     .then(property => {
    //         if (property) return User.findOne(owner)
    //         else return Property.create({ address, m2, year, cadastre, owner })

    //         .then(user => {
    //             if (owner !== user.id) return Property.create({ address, m2, year, cadastre, owner })
    //             else throw new Error('you are already registered in this property')
    //         })
    //     })