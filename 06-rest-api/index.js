//initiate npm
//install express

const express=require('express')
const mongoose = require("mongoose")
// const users=require('./MOCK_DATA.json')
const app=express()
const port=8000;
const fs=require("fs");//modifying mockdata using new data sent from the browser
// const { nextTick } = require('process');


//schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required : true,
    },
    lastName:{
        type:String,
    
    },
    email:{
        type: String,
        required: true,
        unique: true,
    }

}, {timestamps: true}

)
//after schema i need to create model
const User= mongoose.model('user', userSchema)

//connection
mongoose.connect("mongodb://127.0.0.1:27017/insta-app-1")
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log("Mongo error", err));



// Middleware to parse form data (urlencoded)
app.use(express.urlencoded({extended:false}))

app.use(express.json());


// Middleware to log request method and URL
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  //we can also modify the req, res objects
  req.name="sugam"
  next(); // Move to the next middleware or route
});

app.use((req,res,next)=>{
    console.log("hello from middleware 2",req.name)   //req.name is available everywhere
    fs.appendFile("log.txt",`\n${Date.now()}: ${req.ip}: ${req.method}:${req.path}`,(err)=>{//created middleware which creates logfile containing all the info
    if (err) {
      console.error("Error writing to log file:", err);
    }
    next();
}) 
})

//routes
app.get("/api/users", async(req,res)=>{
    const allDbUsers = await User.find({})

    return res.json(allDbUsers)
})
//but we should build server that should be hybrid in nature. i.e our server should send json data for mobile applications and html data for browser.

app.get("/users", async(req,res)=>{
    const allDbUsers = await User.find({})
    const html=`
    <ul>
    ${allDbUsers.map((user)=>`<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `
    res.send(html)
})//hybrid server sends html data if path is /users, sends json data if path is /api/users

app.route("/api/users/:id").get(async(req,res)=>{
    
    const user = await User.findById(req.params.id)
    return res.json(user)
}).patch(async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id, {lastName: 'changed'})
    return res.json({status:'success'})
    
    
}).delete(async(req,res)=>{
    //todo - delete new user with id
    await User.findByIdAndDelete(req.params.id)
    res.json({status:'success'})
    
})

//browser sends only get requests,not POST, PATCH, DELETE

app.post("/api/users", async(req,res)=>{

    const body=req.body
    console.log("body:", body);
    console.log("first_name value:", body.first_name);
    if(!body || !body.first_name){
        return res.status(400).json({msg:"firstname is compulsory"})
    }
    
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
    })
   console.log(result)
    return res.status(201).json('succesfully added')
})

// app.patch("/api/users/:id", )    all path is merged with the help of route

// app.delete("/api/users/:id", )

//some form data is sent in browser and we need to receive that data, that is done with the help of middlewares

app.listen(port,()=>console.log(`server started at port: ${port}`))