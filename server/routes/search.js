const search=require('../models/migrations/20190618162334-create-classes')

module.exports=function(app,Class,meetInfo,schedule,Student){

    app.get('/:term',async function(req,res){
        try{
            let createSearch= await search.up(Class)
            let result= await Class.sequelize.query('SELECT * FROM classes WHERE _search @@ plainto_tsquery((:l), (:t))',
            {
                replacements: {l:'english',t:req.params.term},
                type:Class.sequelize.QueryTypes.SELECT
            })
            console.log(result)
            res.status(200).send(result)
            let deleteSearch = await search.down(Class)
        }catch(error){
            console.log(error)
            res.status(400).send(error)
        }      
    })
}