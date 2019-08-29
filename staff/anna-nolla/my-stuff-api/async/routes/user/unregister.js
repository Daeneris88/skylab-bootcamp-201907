const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { id }, body: { password } } = req
    debugger
    try {
        logic.unregisterUser(id, password)
            .then(() => res.json({ message: 'User unregistered successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch({ message }) {
        res.status(404).json({ error: message })
    }
}
