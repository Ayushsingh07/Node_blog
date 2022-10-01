const router =require("express").Router()

const category=require("../models/category")

router.post("/",async (req,res)=>{
    const newcat =new category(req.body)
    try{
        const savecat= await newcat.save()
        res.status(200).json(savecat)
    }catch(err){res.status(500).json(err)}
})  

//all cateogry
router.get("/",async (req,res)=>{
    
    try{
        const cats =await category.find()
        res.status(200).json(cats)
    }catch(err){
        res.status(500).json(err)
    }
})  








module.exports=router