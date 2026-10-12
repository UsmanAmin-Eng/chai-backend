import mongoose from 'mongoose';

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI;
    const databaseName = process.env.DB_NAME;
    if (!mongoUri) {
        throw new Error('MONGODB_URI is not defined');
    }
    if (!databaseName) {
        throw new Error('DB_NAME is not defined');
    }
    if (/<[^>]+>/.test(mongoUri)) {
        throw new Error(
            'MONGODB_URI in .env still contains placeholders. Replace the username, password, and cluster host with your MongoDB Atlas values.'
        );
    }

    let connectionUrl;
    try {
        connectionUrl = new URL(mongoUri);
    } catch (error) {
        throw new Error('MONGODB_URI in .env is not a valid connection string.', { cause: error });
    }
    const username = decodeURIComponent(connectionUrl.username);
    const password = decodeURIComponent(connectionUrl.password);

    if (!username || !password) {
        throw new Error(
            'MONGODB_URI in .env must contain your MongoDB Atlas database username, password, and cluster host. Replace all placeholders.'
        );
    }

    connectionUrl.pathname = `/${databaseName}`;
    const connectionInstance = await mongoose.connect(connectionUrl.toString());
    console.log(`MongoDB connected !! DB: ${connectionInstance.connection.host}`);
};

export default connectDB;