const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { id } } = req
    const number = req.body.number
    
    try {
        logic.unregisterCard(id, number)
            .then(() => res.json({ message: 'Card unregistered successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
