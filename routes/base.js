var express=require('express')

const router=express.Router()

router.get('/',function(req,res){
        res.json({message:"Backend is running"})
})

module.exports=router