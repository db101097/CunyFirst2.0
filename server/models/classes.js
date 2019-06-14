const Sequelize=require('sequelize');
const Model=Sequelize.Model;
//class model description

module.exports =function(sequelize){
    class Classes extends Sequelize.Model{}
        Classes.init({
            subject:{
                type:Sequelize.STRING,
                allowNull:false, 
                validate:{
                    notEmpty:true
                }
            },
            courseNumber:{
                type:Sequelize.STRING,
                allowNull:false,
                validate:{
                    notEmpty:true,
                }
            },
            section:{
                type:Sequelize.STRING,
                allowNull:false,
                validate:{
                    notEmpty:true,
                }
            },
            name:{
                type:Sequelize.STRING,
                allowNull:false,
                validate:{
                    notEmpty:true,
                }
            }
    },{
        sequelize,
        modelName:"classes"
    })
    return Classes
}