const search=require('../models/migrations/20190618162334-create-classes')

module.exports=function(app,Class,meetInfo,schedule,Student,classDetail,classAvailability){

    app.get('/getClassInfo/:classId',async function(req,res){
        try{
            let info=await Class.findOne({
                where:{
                    id:req.params.classId
                },
                include:[classDetail,meetInfo,classAvailability]
            })
            console.log("info: ",info)
            if(info===null || info===undefined || (info!=null && info.length===0)){
                res.status(400).send("class does not exist")
            }
            res.status(200).send(info)

        }catch(error){
            console.log(error)
            res.status(400).send("class could not be found")
        }
    })

    //query the model
    // first params(/:term) to be term searching for (eg:CSCI) AND second params to be student id
    app.get('/findConflict/:term/:studentId',async function(req,res){
        try{ 
            let createSearch= await search.up(Class)
            let result= await Class.sequelize.query('select distinct search.title, search.days,search."startTime", search."endTime" from (SELECT * FROM classes inner join "meetInfos" on classes.id="meetInfos"."classId" WHERE  _search @@ plainto_tsquery((:l), (:t))) as search inner join (select schedules."classId","studentId",subject,title,"courseNumber",section,name,days,"startTime","endTime",instructor,room from schedules inner join classes on classes.id=schedules."classId" inner join "meetInfos" on classes.id="meetInfos"."classId" where schedules."studentId"=(:sid)) as schedule on CAST(search."startTime" as TIME) < CAST(schedule."endTime" as TIME) and CAST(search."endTime" as TIME) > CAST(schedule."startTime" as TIME) and schedule.days && search.days and schedule."classId"!=search."classId"',
            {
                replacements: {l:'english',t:req.params.term, sid:req.params.studentId},
                type:Class.sequelize.QueryTypes.SELECT
            })
            console.log(result)
            let deleteSearch = await search.down(Class)
            res.status(200).send(result)
        }catch(error){
            let deleteSearch = await search.down(Class)
            console.log(error)
            res.status(400).send(error)
        }      
    })

    // first params(/:term) to be term searching for (eg:CSCI) AND second params to be student id
    app.get('/getClasses/:term/:studentId',async function(req,res){
        try{ 
            let createSearch= await search.up(Class)
            let result= await Class.sequelize.query('SELECT * FROM classes inner join "meetInfos" on classes.id="meetInfos"."classId" WHERE  _search @@ plainto_tsquery((:l), (:t))',
            {
                replacements: {l:'english',t:req.params.term},
                type:Class.sequelize.QueryTypes.SELECT
            })
            console.log(result)
            let deleteSearch = await search.down(Class)
            res.status(200).send(result)
        }catch(error){
            let deleteSearch = await search.down(Class)
            console.log(error)
            res.status(400).send(error)
        }      
    })
}