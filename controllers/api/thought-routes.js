const router = require('express').Router();
const {Thought, Reaction} = require('../../models');
const { Types} = require("mongoose");

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
        if(!temp){
            res.json({message:"No thought by that id was found."});
        }else{
            res.json(temp).status(200);
        }
    }catch(e){
        res.json(e).status(400);
    }
});

router.put("/:id", async(req,res)=>{
    try{
        let temp = await Thought.findByIdAndUpdate(req.params.id,req.body,{new: true});
        if(!temp){
            res.json("No thought was found by that ID.");
        }else{
            res.json(temp).status(200);
        }
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
        let temp2 = await Reaction.create({...req.body});
        let ins = await Thought.findByIdAndUpdate(req.params.thoughtId,{$push:{reactions:temp2}},{new:true});
        res.json(ins).status(200);
    }catch(e){
        res.json(e).status(400);
    }
});

router.delete("/:thoughtId/reactions/:reactionId", async(req,res) =>{
    try{
        let results = await Thought.findByIdAndUpdate(req.params.thoughtId,{
            $pull:{
                reactions:{
                    reactionId: Types.ObjectId(req.params.reactionId)
                }
            }
        },{new:true});
        res.json(results).status(200);
    }catch(e){
        res.json(e).status(400);
    }
});

module.exports = router;