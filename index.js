import app from "./app.js";
import mongoose from "mongoose";

(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/users");
        console.log("DB CONNECTED");

        const onListening = () => {
            console.log("Listening on port 5000");
        };

        app.listen(5000, onListening);
    } catch (error) {
        console.error("error", error);
        throw error;
    }
})();
