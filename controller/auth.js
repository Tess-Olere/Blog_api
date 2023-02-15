const Users = require('../models/user')
const handleErrors = require('../utils/handleErrors')

const register = async (req, res) => {
    const { email, name, password } = req.body
    if(!email || !password || !name) {
      return  res.status(400).json({ success: false, message: 'Please provide necessary information'})
    }
    try{
        const user = await Users.create({...req.body}) // name, email, password
        const token = user.generateToken()
        res.status(201).json({ user: { name: user.name, email: user.email}, token })
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({ errors })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) {
        return  res.status(400).json({ success: false, message: 'Please provide necessary information'})   
    }
    try {
        const user = await Users.findOne({ email})
        if(!user) {
            throw Error('Incorrect Email')
        }
        const authenticated = await user.comparePassword(password)
        if (!authenticated) {
            throw Error('Incorrect Password')
        }
        const token =user.generateToken()
        res.status(200).json({ user: {name: user.name, email: user.email}, token})
    } catch (error) {

    }
}

module.exports = {register, login}