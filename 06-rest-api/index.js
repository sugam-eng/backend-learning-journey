//initiate npm
//install express

const express=require('express')
const users=require('./MOCK_DATA.json')
const app=express()
const port=8000;
const fs=require("fs")//modifying mockdata using new data sent from the browser

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
    const id=Number(req.params.id)
    const index = users.findIndex((user) => user.id === id);
    console.log(index)
   if (index === -1) return res.status(404).json({ error: "User not found" });//If the user with ID 503 doesn't exist, send 404 Not Found response.
    const updatedUser = { ...users[index], ...req.body };//Merges the old user object with the new data from the request body using the spread operator.
    users[index] = updatedUser;

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
    if (err) return res.status(500).json({ status: "error", error: err });   
    return res.json({ status: "success", updatedUser });
});


    
    
}).delete((req,res)=>{
    //todo - delete new user with id
    const id = Number(req.params.id);
        const index = users.findIndex((user) => user.id === id);

        if (index === -1) return res.status(404).json({ error: "User not found" });

        // Remove user
        users.splice(index, 1);

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            if (err) return res.status(500).json({ status: "error", error: err });
            return res.json({ status: "success", message: `User with id ${id} deleted.` });
        })
})

//browser sends only get requests,not POST, PATCH, DELETE
//we are just defining paths
app.post("/api/users", (req,res)=>{

    const body=req.body
    console.log("body", body)
    users.push({...body, id: users.length+1})
    fs.writeFile ('./MOCK_DATA.json', JSON.stringify(users),(err,data)=>{

         return res.json({status:"success",id:users.length})
    })


    //todo - create new user
   
})

// app.patch("/api/users/:id", )    all path is merged with the help of route

// app.delete("/api/users/:id", )

//some form data is sent in browser and we need to receive that data, that is done with the help of middlewares

app.listen(port,()=>console.log(`server started at port: ${port}`))