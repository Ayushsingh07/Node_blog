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

router.put("/:id",async(req,res)=>{
    try{
        const post =await Post.findById(req.params.id)
        if(post.username === req.body.username){
        try{
            const updatePost =await Post.findByIdAndUpdate(
                req.params.id,
                {
                    $set:req.body,
                },
                {new:true}
            )
            res.status(200).json(updatePost)
        }catch(err){res.status(500).json(err)}
    }
    else{
        res.status(401).json("you can update only your post!!!")
    }
    }catch(err){res.status(500).json(err)
    }
    
})
//delete post`
router.delete("/:id",async(req,res)=>{
    try{
        const post =await Post.findById(req.params.id)
        if(post.username === req.body.username){
        try{
            await post.delete()
            res.status(200).json("post deleted")
        }catch(err){res.status(500).json(err)}
    }
    else{
        res.status(401).json("you can delete only your post!!!")
    }
    }catch(err){res.status(500).json(err)
    }
    
})

//GET post

router.get("/:id", async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        

        res.status(200).json(post)

    }catch(err){
        res.status(500).json(err)
    }
    
})
//all post
router.get("/", async (req,res)=>{
    const username =req.query.user
    const catname=req.query.cat

    try{


        let posts

        if(username){
            posts =await Post.find({username})
        }else if(catname){
            posts= await Post.find({categories:{
                $in:[catname]
            }})
        }else {
            posts= await Post.find()
        }

        res.status(200).json(posts)


    }catch(err){
        res.status(500).json(err)
    }
    
})




module.exports=router