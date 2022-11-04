const router = require('express').Router();
const {Thought} = require('../../models');

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

module.exports = router;