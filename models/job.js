// company, position, status, createdBy
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = new Schema({
    company: {
        type: String,
        required: [true, 'Please provide a company name'],
    },
    position: {
        type: String,
        required: [true, 'Please provide a position'],
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user'],
    }, 
    status: {
        type: String,
        enum: ['interview', 'applied', 'declined'],
        default: 'applied',
    },
},
{ timestamps: true }
)

module.exports = mongoose.model('Job', jobSchema)