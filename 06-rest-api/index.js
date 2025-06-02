//initiate npm
//install express

const express=require('express')
const users=require('./MOCK_DATA.json')
const app=express()
const port=8000;

//middleware
app.use(express.urlencoded({extended:false}))

//routes
app.get("/api/users", (req,res)=>{
    return res.json(users)
})
//but we should build server that should be hybrid in nature. i.e our server should send json data for mobile applications and html data for browser.

app.get("/users", (req,res)=>{
    const html=`
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html)
})//hybrid server sends html data if path is /users, sends json data if path is /api/users

app.route("/api/users/:id").get((req,res)=>{
    const id=Number(req.params.id)          //req.params.id gives string
    const user=users.find((user)=>user.id===id)
    return res.json(user)
}).patch((req,res)=>{
    //todo - update new user with id
    return res.json({status:"pending"})
}).delete((req,res)=>{
    //todo - delete new user with id
    return res.json({status:"pending"})
})

//browser sends only get requests,not POST, PATCH, DELETE
//we are just defining paths
app.post("/api/users", (req,res)=>{

    const body=req.body
    console.log("body", body)
    //todo - create new user
    return res.json({status:"pending"})
})

// app.patch("/api/users/:id", )    all path is merged with the help of route

// app.delete("/api/users/:id", )

//some form data is sent in browser and we need to receive that data, that is done with the help of middlewares

app.listen(port,()=>console.log(`server started at port: ${port}`))