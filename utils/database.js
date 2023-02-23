const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const dbname = process.env.DBNAME
const mongoDB = `mongodb://localhost:27017/${dbname}`
mongoose.set("strictQuery", true);


exports.connectDB = async () => {
    try {
        await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
        });
        console.log(`db connected to ${dbname}`);
    } catch (error) {
        console.log(error);
    }
};
