import mongoose from "mongoose";
import express from "express";
//import User from "../models/User.js"; // Make sure to create the User model file first
import path from "path"
//import onUserAuthentication from "./view.js";
import exphbs from 'express-handlebars';
import api from './routes/api.js';
import views from './routes/views.js'; 

const app = express();
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views/');



// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory (frontend)
app.use(express.static(path.join(path.resolve(), 'public')));

app.use(express.urlencoded({ extended: true }));

(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/users");
        console.log("DB CONNECTED");

        const onListening = () => {
            console.log("Listening on port 5000");
        };

        app.use(api);
        app.use(views);

        app.listen(5000, onListening);
    } catch (error) {
        console.error("error", error);
        throw error;
    }
})();