const router =require("express").Router()

const User=require("../models/user")
const bcrypt = require('bcrypt');
const user = require("../models/user");



//update
router.put("/:id",async(req,res)=>{
    if(req.body.userId ==req.params.id){
        if(req.body.password){
            const salt =await bcrypt.genSalt(10)
            req.body.password =await bcrypt.hash(req.body.password,salt)
        }
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        })
        res.status(200).json(updateUser)
       
    }
    catch(err){
        res.status(500).json(err)
    }
}   else {
        res.status(500).json("not allowed!!!")
    }

})

//delete




module.exports=router