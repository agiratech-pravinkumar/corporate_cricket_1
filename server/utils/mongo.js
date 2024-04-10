const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/cricket'; 

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(uri, {
          
            
        });
        console.log("DB is Connected");
        return conn; 
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1); 
    }
}

module.exports = connectToDB;
