/*
     Helper function that will return the capacity of the class 
     it will query the classAvailability model to find the waitlist
     capacity of the class. It requires the classAvailability model
     and class id as param in order to return the capacity
*/
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


/*
     Helper function that will return a boolean if a student is already on the
     list. It takes a list and the id of the student. It will iterate through the
     list and return true if the student is on the list and false if they are not.
*/
function isInList(list,sid){
        for(let i=0;i<list.length;i++){
           if(list[i].studentId===sid){
               return true;
           }
        }

        return false;
}


/*
     Helper function that will update the positions of everyone on the list.
     When someone is removed from the list that means others below them must
     move up the list. To do so everyone beneath that person will have their
     position decremented by 1. 

     1 2 3 4 5 6

     After 4 get removed
     1 2 3 5 6

     After moveUpList function is called
     1 2 3 4 5

     Takes the waitList model , the position of the person removed and the class id
     as params
*/
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


/*
        The getList route will gett all students on the list.The class id is 
        provided as a url param.Using this info the database will be queried 
        to find all rows that matches the class id.
*/
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



// test routes to add students and classes to the database 
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
                console.log(req.body)
                let sbj=req.body.subject;
                let cn=req.body.courseNumber;
                let sec=req.body.section;
                let name=req.body.name;
                let title=req.body.title
                Class.create({
                    subject:sbj,
                    courseNumber:cn,
                    section:sec,
                    name:name,
                    title:title
                }).then((result)=>{
                    res.status(200).send('class added')
                }).catch((error)=>{
                    console.log(error)
                    res.status(400).send(error)
                })
                
        })



/*
        The joinList route will add a student to the list The class id is 
        provided as a url param and the student id will be provided in the 
        request body. 
        expects:
        {
            "studentId": the id of the student
        }

        Using this info the database will be queried to find the student
        add that student to the list if the list is not at capacity and 
        the student is not alread on the list
*/
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




/*
        This route will remove a student from the waitlist of some class
        The class id is provided as a url param and the student id will
        be provided in the request body. 
        expects:
        {
            "studentId": the id of the student
        }

        Using this info the database will be queried to find the student
        delete that student and change the other students postions accordingly
*/
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
                        res.status(200).send('The list does not exist')
                    }
                    else if (results.length===0){
                        //the student/class combo was not found 
                        res.status(400).send('The list or the student could not be found')
                    }
                    else{
                        //save the postion of the student
                        let currPosition=results.position;
                        //delete the student from the list
                        results.destroy()
                        //retrieve the list and subtract 1 from position from every entry below the one just deleted
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