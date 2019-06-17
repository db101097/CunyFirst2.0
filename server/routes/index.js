const router=require("express").Router();

//subroutes 
const scheduleRouter=require("./schedule");

//mount subroutes to assemble apirouter
router.use('/schedule',scheduleRouter);

//error handling middleware;
router.use((req,res,next)=>{
    const error=new Error("Not found, Please check URL!");
    error.status=404;
    next(error);
});

module.exports=router;