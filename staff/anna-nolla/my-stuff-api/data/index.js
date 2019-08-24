const mongoose = require('mongoose')
const { user, car, card, property } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Car: mongoose.model('car', car),
    Card: mongoose.model('card', card), 
    Property: mongoose.model('property', property)
}