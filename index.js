const express= require('express')
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const authRoute=require("./routes/auth")
const app=express()
const userRoute=require("./routes/users")
dotenv.config()

app.use(express.json())


mongoose.connect(process.env.mongodb).then(console.log("connected to DB")).catch((err)=>console.log(err));

app.use("/users",userRoute)
app.use("/auth",authRoute)

// app.use("/",(req,res) =>{
//     console.log("url ")
// })


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500);
    res.json({
      error: {
        message: error
      }
    });
  });

app.listen('5000',()=>{
    console.log("running good gg")
})  

