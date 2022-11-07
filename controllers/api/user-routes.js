const router = require('express').Router();
const {User, Thought} = require('../../models');

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
        // temp.toJSON();
        // console.log(temp.toObject({virtuals: true}));
        res.json(temp).status(200);
    }catch(e){
        res.json(e).status(400);
    }
});

router.post("/", async(req,res) =>{
    try{
        let temp = await User.create({...req.body})
        console.log(temp);
        res.json(temp).status(200);
    }catch(e){
        res.json(e).status(400);
    }
    
});

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

router.post("/:userId/friends/:friendId", async(req,res) =>{
    try{
        let temp = await User.findById(req.params.userId);
        let temp2 = await User.findById(req.params.friendId);
        await temp.updateOne({$push:{friends: temp2._id}})
        res.status(200);
    }catch(e){
        res.json(e).status(400);
    }
});

router.delete("/:userId/friends/:friendId", async(req,res)=>{
    try{
        let temp = await User.findById(req.params.userId);
        await temp.updateOne({$pull:{friends:{id:req.params.id}}});
        let results = await temp.save();
        res.json(results).status(200);
    }catch(e){
        res.json(e).status(400);
    }
});


module.exports = router;