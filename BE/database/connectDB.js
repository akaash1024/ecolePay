const mongoose = require("mongoose")

let URL = process.env.MONGO_URL

const connectDB = async() => {
    try {
        await mongoose.connect(URL)
        console.log(`Mongo Database connected`);
        
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

module.exports  = {connectDB}