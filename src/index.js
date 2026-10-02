import connectDB from "./db/index.js";

connectDB()
.then(() =>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err)=>{
    console.error('Mongo DB connection failed:', err);
    process.exit(1);
})









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