const http=require("http") //It is a core module (no need to install it).Lets you build web servers and handle HTTP requests/responses.
const myserver=http.createServer((req,res)=>{
    console.log("new req")
    console.log("Requested Path:", req.url);
    switch (req.url){
        case "/":res.end("hello from sugam")
        break
        case "/about":res.end("you are in about section")
        break
        case "/home":res.end("you are in homepage")
        default:
            res.end("404 not found")
    }
    
})//Creates a server that handles incoming requests

myserver.listen(8000)