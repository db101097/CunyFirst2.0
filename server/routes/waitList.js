function findClassCapacity(classAvailability,cid){
        classAvailability.findOne({
                where:{
                    id:cid
                }
        })
        .then((results)=>{
                if(results===null || (results!=null && results.length==0)){
                        return 0;
                }
                else{
                    return results.length
                }
        })
        .catch((err)=>{
                return 0;
        })
}

function isInList(list,sid){
        for(let i=0;i<list.length;i++){
           if(list[i].studentId===sid){
               return true;
           }
        }

        return false;
}

function moveUpList(waitList,position,cid){
        waitList.findAll({
            where:{
                classId:cid
            }
        })
        .then(async (results)=>{
            for(let i=position-1;i<results.length;i++){
                console.log(results[i],position)
                results[i].position=results[i].position-1;
                results[i].save()
            }
        })    
}


module.exports=function(waitList,classAvailability,Class,student,app){

        app.get('/getList/:classId',function(req,res){
                let cid = req.params.classId;
                waitList.findAll({ 
                    where: {
                        classId: cid
                     }
                }).then((results)=>{
                    if(results===null || results===undefined){
                        res.status(200).send('That college does not exist')
                    }
                    else if (results.length===0){
                        console.log('length',results.length)
                        res.status(200).send('The list is empty')
                    }
                    else{
                        res.status(200).send(results)
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).send(err);
                })
        });

        app.post('/addStudent',async function(req,res){
                console.log('here')
                let f=req.body.firstName
                let l=req.body.lastName
                let e=req.body.email
                let p=req.body.password
                let m=req.body.major
                await student.create({
                    firstName:f,
                    lastName:l,
                    email:e,
                    password:p,
                    major:m
                });
                res.status(200).send('student added')
         })

        app.post('/addClass',async function(req,res){
                console.log('here')
                let sbj=req.body.subject;
                let cn=req.body.cn;
                let sec=req.body.sec;
                let name=req.body.name;
                Class.create({
                    subject:sbj,
                    courseNumber:cn,
                    section:sec,
                    name:name
                });
                res.status(200).send('class added')
        })

        app.post('/joinList/:classId',function(req,res){
                let cid = req.params.classId;
                let sid=req.body.studentId;
                //find the waitlist capcity of the class
                let capacity=findClassCapacity(classAvailability,cid)
                //find all the rows that share the same class id 
                waitList.findAll({
                    where:{
                        classId:cid
                    }
                })
                .then(async (results)=>{
                    //if the length of the results is equal to capacity do not add 
                    if(isInList(results,sid)===true){
                        res.status(200).send('You are already on the list')
                    }
                    else if(results.length===capacity){
                        //inform the user that the list is at capacity
                        res.status(200).send('Class is at capacity')
                    }
                    else{
                        //add new entry to the list position is the current length of the list+1
                        try{
                            await waitList.create({position:results.length+1,classId:cid,studentId:sid})
                            res.status(200).send('Successfully Added')
                        }catch(err){
                            res.status(400).send('Could not be added to the list')
                        }
                    }
                })
                .catch((err)=>{
                        console.log(err)
                        res.status(400).send(err);
                })
        });

        app.delete('/leaveList/:classId',function(req,res){
                let cid = req.params.classId;
                let sid=req.body.studentId;
                waitList.findOne({ 
                    where: {
                        classId: cid,
                        studentId:sid
                    }
                }).then((results)=>{
                    if(results===null || results===undefined){
                        res.status(200).send('That college does not exist')
                    }
                    else if (results.length===0){
                        console.log('length',results.length)
                        res.status(400).send('The list or the student could not be found')
                    }
                    else{
                        //save the postion of the student
                        // 1 2 3 4 5 6 7 8 9 
                        // 1 2 3 4 6 7 8 9
                        let currPosition=results.position;
                        results.destroy()
                        moveUpList(waitList,currPosition,cid)
                        res.status(200).send('Successfully Deleted');
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).send(err);
                })
        })
}