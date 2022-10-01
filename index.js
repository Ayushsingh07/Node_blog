const express= require('express')
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const authRoute=require("./routes/auth")
const app=express()
const userRoute=require("./routes/users")
const postRoutes= require("./routes/posts")
const catRoutes=require("./routes/categories")
const multer =require("multer")



dotenv.config()

app.use(express.json())


mongoose.connect(process.env.mongodb).then(console.log("connected to DB")).catch((err)=>console.log(err));
const storage= multer.diskStorage({
  destination:(req,file,cb) =>{
    cb(null,"images")
  },filename:(req,file,cb)=>{
    cb(null,"hello")
  },
})

const upload =multer({storage:storage})
app.post("/upload",upload.single("file"),(req,res)=>{
  res.status(200).json("file uploaded")
})


app.use("/category",catRoutes)
app.use("/post",postRoutes)
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

