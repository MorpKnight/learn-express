import mongoose from "mongoose";

mongoose
    .connect('mongodb://127.0.0.1:27017/learn-express')
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log(err);
    });