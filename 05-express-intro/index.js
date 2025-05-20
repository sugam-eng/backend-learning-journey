const http=require("http") // not necessary, so can remove line 1, express uses http module internally

const express=require("express")//express is installed using npm i express

const app=express() // Creates an Express app

app.get('/',(req,res)=>{
    return res.send('you are in home page')
})
app.get('/about',(req,res)=>{
    return res.send(`hello ${req.query.name} you are ${req.query.age}`)//assume url is localhost:8000/about?name=sugam&age=23
})

// const myserver=http.createServer(app)
// myserver.listen(8000)                  //Not necessary

app.listen(8000)
