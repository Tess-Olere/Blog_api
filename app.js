require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const notFound = require('./middleware/notFound')
const authRouter = require('./routes/authRouter')
const journalRouter = require('./routes/journalRouter')
const auth = require('./middleware/authentication')
mongoose.set('strictQuery', true);

// middleware
app.use(express.json())

// routes
// public
app.use("/api/v1", authRouter)
// private
app.use('/api/v1/journals', auth, journalRouter)

// error routes
app.use(notFound)

const start = async () => {
    try {
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}...`);   
    })
} catch (error) {
    console.log(error);
}
}
start();