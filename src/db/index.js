import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        const databaseName = process.env.DB_NAME;
        if (!mongoUri) {
            throw new Error('MONGODB_URI is not defined');
        }
        if (!databaseName) {
            throw new Error('DB_NAME is not defined');
        }

        const connectionUrl = new URL(mongoUri);
        connectionUrl.pathname = `/${databaseName}`;
        const connectionInstance = await mongoose.connect(connectionUrl.toString());
        console.log(`MongoDB connected !! DB: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;