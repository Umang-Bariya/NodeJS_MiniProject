const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/emailDB", {useNewUrlParser: true});

const emailSchema = {
    email: String,
    name: String
}

const Email = mongoose.model("Weather",emailSchema);

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.get("/success",function(req,res){
    res.sendFile(__dirname+"/success.html")
})

app.post("/",function(req,res){
    const emailId = req.body.email;
    const userName = req.body.name;

    const email = new Email({
        email:emailId,
        name:userName
    });

    email.save();

    res.redirect("/success")
})

app.listen(3000, function() {
    console.log("Server is started on port 3000");
})