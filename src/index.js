import { app } from "./app.js";
import connectDB from "./db/index.js";

const startServer = async () => {
    await connectDB();

    const port = Number(process.env.PORT) || 8000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer().catch((error) => {
    console.error('Application startup failed:', error.message);
    process.exitCode = 1;
});