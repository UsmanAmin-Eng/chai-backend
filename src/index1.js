import mongoose from 'mongoose';
import {DB_NAME} from './constant.js';

const connectDB = async () => {
    try{


    }catch (error) {
       const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}/`); // Disconnect from MongoDB if there's an error
       console.log('\n MongoDB connected !! DB: ${connectionInstance.connection.host}');
        process.exit(1); // Exit the process with an error code
    }
}
export default connectDB;