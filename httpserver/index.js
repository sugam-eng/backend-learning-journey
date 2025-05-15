const http=require("http") //It is a core module (no need to install it).Lets you build web servers and handle HTTP requests/responses.
const myserver=http.createServer((req,res)=>{
    console.log("new req")
    res.end("hello from sugam")
})//Creates a server that handles incoming requests

myserver.listen(8000)