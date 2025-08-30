const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
const {connectToMongoDB} = require("./connection");
const URL = require("./models/url")
const PORT = 8001;

//connection
connectToMongoDB("mongodb://127.0.0.1:27017/shorturl").then(()=>console.log("MongoDB connected"));


//middlewares
app.use(express.json());


//routes
app.use("/url", urlRoute);


app.listen(PORT , ()=>{
    console.log(`Server started at PORT ${PORT}`);
})