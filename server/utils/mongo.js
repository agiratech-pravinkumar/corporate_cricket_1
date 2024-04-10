const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.DB_SERVER

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(uri);
        console.log("DB is Connected");
        return conn; 
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1); 
    }
}

module.exports = connectToDB;
