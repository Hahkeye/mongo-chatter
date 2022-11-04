const router = require('express').Router();
const {User} = require('../../models');

router.get("/", async (req,res) =>{
    try{
        let temp = await User.find({});
        // console.log(temp);
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
    let temp = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.json(temp).status(200);
});

router.delete("/:id", async(req,res)=>{
    let temp = await User.findByIdAndDelete(req.params.id);
    res.json(temp).status(200);
});


module.exports = router;