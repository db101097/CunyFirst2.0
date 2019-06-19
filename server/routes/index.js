const router=require("express").Router();


//error handling middleware;
router.use((req,res,next)=>{
    const error=new Error("Not found, Please check URL!");
    error.status=404;
    next(error);
});

module.exports=router;