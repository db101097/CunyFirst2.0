const express=require('express');
const router=express.Router();
//const Sequelize=require('../sequelize')

const {Classes,meetingInfo}=require('../models');

const dummyclass = [{
    subject:"CSCI",
    courseNumber:"33500",
    section:"02",
    name:"Software Analysis III"
}]

// Schedule.belongsTo(Class)  //will add classId to schedule
// Schedule.belongsTo(Student) //will add studentId to schedule


//get all class schedule
//class schedule include attributes from classes and meetingInfo


router.get('/',(req,res)=>{
    res.json(dummyclass);
})

//     try{
//         //SELECT * from classes 
//        const classes=await Classes.findAll();
//        const meetInfo=await meetingInfo.findAll();  
//         res.json(classes);
//         res.json(meetInfo);
//     }catch(error){
//         next(error);
//     }
// })

//route to add classes to schedule
//when adding should nt conflict with other classes time
router.post("/:id",async(req,res,next)=>{
    try{
        // const subject=req.body.subject;
        // const courseNumber=req.body.courseNumber;
        // const section=req.body.section;
        // const name=req.body.name;
        const day=req.body.day;
        //const meetInfo=await meetingInfo.findAll();
            meetingInfo.findorCreate({ where:{days:day}})
            .then(([meetInfo,created])=>{
            console.log(meetInfo).get({
                plain:true
            })
            res.json(meetInfo);
            console.log(created)
        });
        // newClass=await Classes.create({
        //         subject,courseNumber,section,name,      
        // })
    }catch(error){
        next(error);
    }
});

//route to swap classes
router.put("/:id",async(req,res,next)=>{
    //res.json("swap a course from schedule");
    try{

    }catch(error){
        next(error);
    }
})

router.delete("/:id",async(req,res,next)=>{
    //res.json("remove class from schedules")
    try{
        const deleteClass=await Classes.destroy({
            where:{id:req.params.id},
        });
        res.sendStatus(204);
    }catch(error){
        next(error);
    }
})

module.exports=router;

