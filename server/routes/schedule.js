
// Schedule.belongsTo(Class)  //will add classId to schedule
// Schedule.belongsTo(Student) //will add studentId to schedule

 async function findClass (Class,meetInfo,classId){
    try{
        let result=await Class.findOne({
            where:{
                id:classId,
            },
            include:[meetInfo]
        })

         if(result===null || (result!=null && result.length===0)){
             return ('empty')
         }else{
             return result;
         }
    }catch(error){
        console.log('error')
        return ("error")
    }
}

async function findStudent(Student,sid){
    try{
        let result=await Student.findOne({
            where:{
                id:sid
            }
        })
        if(result===null || (result!=null && result.length===0)){
            return ('empty')
        }else{
            return result
        }
    }
    catch(error){
        console.log('error')
        return 'error'
    }
}


module.exports=function(app,Class,meetInfo,schedule,Student,meetInfo){
    app.get('/',async(req,res,next)=>{
    //res.json(dummyclass);
        try{
            //SELECT * from classes 
        const classes=await Class.findAll();
        const meetInfo=await meetInfo.findAll();  
            res.send(classes);
            res.send(meetInfo);
        }catch(error){
            res.send(error);
        }
    })
    //add class to schedule
    app.post("/addClass/:classId",async(req,res,next)=>{
        try{
            const sid=req.body.studentId;
            const cid=req.params.classId;
            let classExist=await findClass(Class,meetInfo,cid);
            let studentExist= await findStudent(Student,sid)
            console.log('classExist: ',classExist)
            console.log('studentExist',studentExist)
            if(classExist==='empty'|| classExist==='error' ||studentExist==='empty'||studentExist==='error'){
                res.status(400).send('class or student could not be added')
            }else{
            let result=await schedule.create({
                    classId:cid,
                    studentId:sid
                })
                res.send(result)
            }
        }catch(error){
            res.send("error");
        }
    });
}
//      //remove class from schedules
//     app.delete("deleteClass/:id",async(req,res,next)=>{
//         try{


//         res.status(204);
//         }catch(error){
//             res.send('error')
//         }

//     }
// //     try{
// //         await Classes.destroy({
// //             where:{id:req.params.id},
// //         });


// }


//get all class schedule
//class schedule include attributes from classes and meetingInfo

// app.get('/',async(req,res,next)=>{
//     //res.json(dummyclass);
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

// app.get("/:id",async(req,res,next)=>{
//     try{
//         let singleClass=await Classes.findOne(req.params.id);
//         res.json(singleClass)
//     }catch(error){
//         next(error);
//     }
// })

//route to add classes to schedule
//when adding should nt conflict with other classes time



// //route to swap classes
// router.put("/:id",async(req,res,next)=>{
//     //res.json("swap a course from schedule");
//     try{
//         let updateClass=await Classes.update(req.body,{
//             where:{id:req.params.id},
//             returning:true,
//             plain:true,
//         })
//         res.json(updateClass[1]);
//     }catch(error){
//         next(error);
//     }
// })


