const router = require('express').Router();
const {Thought, Reaction} = require('../../models');
const { Schema, Types, model} = require("mongoose");

router.get("/", async(req,res)=>{
    try{
        let temp = await Thought.find({});
        res.json(temp).status(200);
    }catch(e){
        res.json(e).status(400);
    }
});
router.post("/", async(req,res)=>{
    try{
        let temp = await Thought.create({...req.body});
        //update user to have the though the array. also should check to make sure it exists
        res.json(temp).status(200);
    }catch(e){
        res.json(e).status(400);
    }
});

router.get("/:id", async(req,res) =>{
    try{
        let temp = await Thought.findById(req.params.id);
        res.json(temp).status(200);
    }catch(e){
        res.json(e).status(400);
    }
});

router.put("/:id", async(req,res)=>{
    try{
        let temp = await Thought.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        res.json(temp).status(200);
    }catch(e){
        res.json(e).status(400);
    }
});

router.delete("/:id", async(req,res)=>{
    try{
        let temp = await Thought.findByIdAndDelete(req.params.id);
        res.json(temp).status(200);
    }catch(e){
        res.json(e).status(400);
    }
});

router.post("/:thoughtId/reactions", async(req,res) =>{
    try{
        let temp = await Thought.findById(req.params.thoughtId);
        let temp2 = await Reaction.create({...req.body});
        let ins = await temp.updateOne({$push:{reactions:temp2}})
        res.json(ins).status(200);
    }catch(e){
        res.json(e).status(400);
    }
});

router.delete("/:thoughtId/reactions/:reactionId", async(req,res) =>{
    try{
        let temp = await Thought.findById(req.params.thoughtId);
        await temp.updateOne({
            $pull:{
                reactions:{
                    reactionId: Types.ObjectId(req.params.reactionId)
                }
            }
        });
        let results = await temp.save();
        // console.log(results);
        res.json(results).status(200);
    }catch(e){
        res.json(e).status(400);
    }
});

module.exports = router;