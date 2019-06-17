const Sequelize= require('sequelize');
const Model=Sequelize.Model;


module.exports=function(sequelize){
    class Student extends Sequelize.Model{}
    Student.init({
        firstName:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
            }
        },
        lastName:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                isEmail:true
           }
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
           }
        },
        major:{
            type:Sequelize.STRING,
            allowNull:true,
            validate:{
                notEmpty:true
            }
        },
    },{
        sequelize,
        modelName:"student"
    })
    return Student
}