/*
    DRY: to return status and description
*/
function createResponse(code,body){
    let response={
        status:code,
        data:body
    }
    console.log(response)
    return response
}

async function updateStatus(classDetail,classId) {
    try{
        let update=await classDetail.findOne({
            where:{
                id:classId,
            }
        })
        update.status="CLOSED"
        update.save()   
        return true
    }catch(error){
        return false
    }
}
/*
    function to find if class exist by checking if classId exist 
*/
async function findClass (Class,classAvailability,classDetail,classId){
    try{
        let result=await Class.findOne({
            where:{
                id:classId,
            },
            include:[classAvailability]
        })
         if(result===null || (result!=null && result.length===0)){
             return ('empty')
         }else if(result.classAvailability.enrollmentTotal+1>result.classAvailability.capacity){
                return false
         }else if(result.classAvailability.enrollmentTotal+1===result.classAvailability.capacity){
                updateStatus(classDetail,classId) 
                result.classAvailability.enrollmentTotal+=1
                result.classAvailability.save()
                return result;
         }
         else{
             console.log("result",result.classAvailability)
             result.classAvailability.enrollmentTotal+=1
             result.classAvailability.save()
             return result;
         }
    }catch(error){
        console.log(error)
        return ("error")
    }
}
/*
    function to find if student exists by checking if studentId exist
*/
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

/*
    raw query within sequelize to check if conflict exist, if result is empty or result not empty and the length of result 
    is zero, then no conflict exists but otherwise conflict exist so we return true

*/

async function findConflict(schedule,Class,meetInfo,cid,sid){
 // select distinct schedule.subject,schedule."courseNumber" from  (select * from classes inner join "meetInfos"
 // on classes.id="meetInfos"."classId" where classes.id=cid) as search inner join  (select * from 
//schedules inner join classes on classes.id=schedules."classId" inner join "meetInfos" on classes.id="meetInfos"."classId"
//where schedules."studentId"=sid) as schedule on CAST(search."startTime" as TIME) < CAST(schedule."endTime" as TIME) and
// CAST(search."endTime" as TIME) > CAST(schedule."startTime" as TIME);
try{
    let result= await schedule.sequelize.query('select distinct schedule.subject,schedule."courseNumber" from (select * from classes inner join "meetInfos" on classes.id="meetInfos"."classId" where classes.id=(:cid)) as search inner join  (select * from schedules inner join classes on classes.id=schedules."classId" inner join "meetInfos" on classes.id="meetInfos"."classId" where schedules."studentId"=(:sid)) as schedule on CAST(search."startTime" as TIME) < CAST(schedule."endTime" as TIME) and CAST(search."endTime" as TIME) > CAST(schedule."startTime" as TIME)', {
        replacements: {cid:cid,sid:sid},
        type:schedule.sequelize.QueryTypes.SELECT
      });
      if(result===null || (result!=null && result.length===0)){
        return false
      }else{
        return true
     }
     console.log("conflict: ",result)
   }catch(error){
        return false
    }
}

/*
    insertClass function first check if class or student exist and conflict does not exist before creating or adding
    class
*/

async function insertClass(schedule,Student,classAvailability,meetInfo,classDetail,Class,sid,cid){
    try{
        let classExist=await findClass(Class,classAvailability,classDetail,cid);
        console.log("classExist: ", classExist)
        let studentExist= await findStudent(Student,sid)
        let conflictExist=await findConflict(schedule,Class,meetInfo,cid,sid)
        if(classExist==='empty'|| classExist==='error' ||studentExist==='empty'||studentExist==='error'){
            return createResponse(400,'class or student does not exist')
        }else if (classExist===false){
            return createResponse(400,'class at capacity')
        }else if(conflictExist===true ){
            return createResponse(400,"class conflicts or already exist")
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

/*
    deleteClass function first check if schedule exist and if it is undefined and null, we return to user saying class or
    student does not exist. If exist we delete the class
*/
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

module.exports=function(app,Class,meetInfo,schedule,Student,classAvailability,classDetail){
    
    // getSchedul route to get all class schedule that matches the studentId
    app.get('/getSchedule/:studentId',async(req,res)=>{
        try{
            let sid=req.params.studentId
            let classes=await schedule.findAll({
                where:{
                    studentId:sid
                },
                include:[{model:Class,include:[meetInfo]}]
            })
            console.log(classes)
            if(classes===undefined||classes===null){
                res.status(400).send("schedule does not exist")
            }
            else{
                res.status(200).send(classes)
            }
        }catch(error){
            console.log(error)
            res.status(400).send("could not get schedule")
        }
    })
    //route to add classes to schedule
    //when adding should nt conflict with other classes time, this is helped with helper function insertClass that will
    //check if conflict exist and add class if no conflict
    app.post('/addClass/:classId',async(req,res)=>{
        const sid=req.body.studentId;
        const cid=req.params.classId;
        let result=await insertClass(schedule,Student,classAvailability,meetInfo,classDetail,Class,sid,cid);
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
        }catch(error){
            res.send('error')
        }
    })
}


