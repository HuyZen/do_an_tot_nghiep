var express = require("express");
var app =  express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/scripts", express.static(__dirname+"/node_modules/web3.js-browser/build/"));

var server = require("http").Server(app);
var io = require("socket.io")(server);
//socket.io
server.listen(5000);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false})); 

//Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://huyzen:1234@server.acxf6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(err){
    if(err){
        console.log("Mongoose connected error!" + err);
    }
    else{
        console.log("Mongoose connected successfully");
    }
    
});

//Thanh toán khách hàng

require("./controllers/game")(app);