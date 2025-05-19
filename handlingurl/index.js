const http=require("http")
const url=require("url") //here url is the external library installed using npm i url

const myserver=http.createServer((req,res)=>{
    const myurl=url.parse(req.url,true);
    console.log(myurl) //here myurl is the object which contains all the information present in url, basically it breaks the whole url
    switch(myurl.pathname){
        case "/":
            res.end("homepage")
            break
        case "/about":
            const qp=myurl.query.myname // just pass true in line 5, this creates query object with keys from url keys and values from url value
            res.end(`hi ${qp}`) // assume your url is localhost:8000/about?myname=sugam&userid=1
            break

        //for example in youtube
        case "/search":
            const search=myurl.query.search_query
            res.end("here are your results for"+search) //assuming yt url as ..../search?search_query=trending+news
        //Handling HTTP methods
        case "/signup":
            if (req.method==='GET') res.end('this is signup form')
            else if(req.method==='POST'){
                //DB Query
                res.end("Success"); 
            }
            //in production we will have many cases and hence many if else conditions. its difficult to handle
            //so we use express framework to manage this
        default:
            res.end("404 end")
    }

})
myserver.listen(8000);