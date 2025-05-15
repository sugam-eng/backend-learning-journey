const fs=require("fs")
//Synchronous
fs.writeFileSync("./text.txt","hello there")   //creates text file with name text

//Async...
fs.writeFile("./text1.txt","hello there asyncc", (err)=>{err})

//you have contacts file and wanted to read this file Synchronously
const result=fs.readFileSync("./contacts.txt", "utf-8")     // here sync stores the result in a variable i.e result, here sync returns something
console.log(result)

//you have contacts1 file and wanted to read this file Asynchronously
fs.readFile("./contacts1.txt", "utf-8", (err,result)=>{
    if (err){
        console.log("error is ", err)
    }else{
        console.log(result)
    }

});
/*
✅ What the Callback Does:It’s a function that Node.js automatically calls once the file read operation finishes — either:
with an error (err is not null), or with a result (file content in result)

🔍 Why Use a Callback? Because file reading takes time (especially on larger files or over networks), you don’t want your entire app to pause. Instead, you tell Node:

"Go read this file. When you're done, call this function with the result (or error)."
So other code can keep running in the meantime.
*/

// if i want to append content instead of overriding
fs.appendFileSync("./text.txt",`${Date.now()}hello there\n`) //make sure to commentout line3

//to delete a file ---fs.unlinkSync("path")
const os=require("os")
console.log(os.cpus().length)