import connectDB from "./db/index.js";

connectDB()




















/*
(async () => {
    try {
        await mongoose.connect('${process.env.MONGO_URI}/${DB_NAME}');
        app.on('error', (error) => {
            console.error('Error: ', error);
            throw error;
        });

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
})()
    */