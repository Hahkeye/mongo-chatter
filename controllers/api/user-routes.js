const router = require('express').Router();
const {User, Thought} = require('../../models');
const { Schema, Types, model} = require("mongoose");


//Get routes
router.get("/", async (req,res) =>{
    try{
        let temp = await User.find({});
        res.json(temp);
    }catch(e){
        res.json(e).status(400);
    }
});

router.get("/:id", async(req,res) =>{
    try{
        let temp = await User.findById(req.params.id);
        res.json(temp).status(200);
    }catch(e){
        res.json(e).status(400);
    }
});
//Post routes
router.post("/", async(req,res) =>{
    try{
        let temp = await User.create({...req.body})
        // console.log(temp);
        res.json(temp).status(200);
    }catch(e){
        res.json(e).status(400);
    }
    
});
//Update routes
router.put("/:id", async(req,res)=>{
    try{
        let temp = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        res.json(temp).status(200);
    }catch(e){
        res.json(e).status(400);
    }
});
//Delete Route
router.delete("/:id", async(req,res)=>{
    try{
        let temp = await User.findByIdAndDelete(req.params.id);
        let temp3 = await Thought.deleteMany({username: temp.username});
        res.json(temp).status(200);
    }catch(e){
        res.json(e).status(400);
    }
});


//User friend routes

//Add friend to user
router.post("/:userId/friends/:friendId", async(req,res) =>{
    try{
        let results = await User.findOneAndUpdate(req.params.userId,{$push:{friends: req.params.friendId}},{new:true});
        res.json(results).status(200);
    }catch(e){
        res.json(e).status(400);
    }
});
//Delete friend from user
router.delete("/:userId/friends/:friendId", async(req,res)=>{
    try{
        let results = await User.findByIdAndUpdate(req.params.userId,{$pull:{friends:req.params.friendId}},{new:true});
        res.json(results).status(200);
    }catch(e){
        res.json(e).status(400);
    }
});


module.exports = router;