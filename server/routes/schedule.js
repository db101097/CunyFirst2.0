
function createResponse(code,body){
    let response={
        status:code,
        data:body
    }
    console.log(response)
    return response
}

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
        console.log(error)
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
        console.log(error)
        return 'error'
    }
}

async function insertClass(schedule,Student,meetInfo,Class,sid,cid){
    try{
        let classExist=await findClass(Class,meetInfo,cid);
        let studentExist= await findStudent(Student,sid)
        console.log('classExist: ',classExist)
        console.log('studentExist',studentExist)
        if(classExist==='empty'|| classExist==='error' ||studentExist==='empty'||studentExist==='error'){
            return createResponse(400,'class or student does not exist')
        }else{
        let result=await schedule.create({
                classId:cid,
                studentId:sid
            })
            return createResponse(200,'successfully added class')
        }
    }catch(error){
        return createResponse(400,'class could not be added')
    }
}

async function deleteClass(Student,schedule,Class,cid,sid){
    try{
        let scheduleExist=await schedule.findOne({
            where:{
                classId:cid,
                studentId:sid
            }
        })
        console.log(scheduleExist)
        if(scheduleExist===undefined||scheduleExist===null){
            return createResponse(400,"class or student does not exist")
        }
        else{
            let result=await scheduleExist.destroy()
            return createResponse(200,'class is deleted')
        }
    }catch(error){
        console.log(error)
        return createResponse(400, 'error')
    }
}


module.exports=function(app,Class,meetInfo,schedule,Student){
    //get all class schedule
    //class schedule include attributes from classes and meetingInfo
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
    //route to add classes to schedule
    //when adding should nt conflict with other classes time
    app.post('/addClass/:classId',async(req,res,next)=>{
        const sid=req.body.studentId;
        const cid=req.params.classId;
        let result=await insertClass(schedule,Student,meetInfo,Class,sid,cid);
        console.log("result",result)
        res.status(result.status).send(result.data)

    });
    //remove class from schedules
    app.delete('/deleteClass/:classId',async(req,res)=>{
        const sid=req.body.studentId;
        const cid=req.params.classId;
        let result=await deleteClass(Student,schedule,Class,cid,sid);
        res.status(result.status).send(result.data)    
    });

    //swap class
    //first check if class exist
    //then add the class and check if it was successful, if success, delete old class
    //call add and delete route from this route
    app.put('/swapClass',async(req,res)=>{
        try{
            let oldClass=req.body.oldClassId
            let newClass=req.body.newClassId;
            let sid=req.body.studentId;
            let insertResult=await insertClass(schedule,Student,meetInfo,Class,sid,newClass)
            if(insertResult.status===400){
                res.status(400).send(insertResult.data)
            }else{
                let deleteResult=await deleteClass(Student,schedule,Class,oldClass,sid);
                if(deleteResult.status===200){
                    res.status(200).send("swap successful")
                }else{
                    res.status(400).send(deleteResult.data)
                }
            
            }
            //add class will handle if class exist        
            res.redirect('/addClass/:classId')


        }catch(error){
            res.send('error')
        }
    })
}

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


