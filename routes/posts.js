const router =require("express").Router()

const User=require("../models/user")

//const user = require("../models/user");
const Post=require("../models/post")

//new post
router.post("/",async(req,res)=>{
    const newPost= new Post(req.body)
    try{
        const savePost =  newPost.save()
        res.status(200).json(savePost)

    }catch(err){
        res.status(500).json(err)
    }

})

//update post

router.delete("/:id",async(req,res)=>{
    if(req.body.userId ==req.params.id){
        try{
             const user = await User.findById(req.params.id)
        
        
        try{
            await Post.deleteMany({username:user.username})
        
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user deleted")
       
        }
    catch(err){
        res.status(500).json(err)
    }}
    catch(err){
        res.status(500).json("user not found")
    
}
}   else {
        res.status(500).json("not allowed!!!")
    }

})
//delete post

//GET post

router.get("/:id", async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password, ...others}=user._doc

        res.status(200).json(others)

    }catch(err){
        res.status(500).json(err)
    }
    
})




module.exports=router