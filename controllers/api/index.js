const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');



//import the specfic routes for user and thoughts
router.use("/users",userRoutes);
router.use("/thoughts",thoughtRoutes);

module.exports = router;