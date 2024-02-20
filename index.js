const express = require('express');
const connectDB = require('./src/db');
const userRouter = require('./src/route/User');

const app = express()

app.use(express.json());

const cors = require("cors");
const bodyParser = require('body-parser');
app.use(cors());

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));



////////////////////////////////////////////////////
app.use(express.static(__dirname + "/uploads"));
app.use("/uploads", express.static("uploads"));
/////////////////////////////////////////////////////

app.use(userRouter)

connectDB().then(()=>{
  app.listen(5000,()=>{
    console.log("Server is running on port: 5000")
  })
}).catch((err)=>{
  console.log("some error ocure",err)
})





