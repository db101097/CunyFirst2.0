const Sequelize = require('sequelize')
module.exports = function(sequelize) {
    class ClassDetail extends Sequelize.Model {}
    ClassDetail.init({
        status:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            },
            
            defaultValue: true
        },
        session:{
            type:Sequelize.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        	
        	defaultValue: "In Person"
        },
        credits:{
        	type:Sequelize.INTEGER,
            allowNull: false,
        	defaultValue: 0,
        	validate: { 
                min: 0,
                notEmpty: true,
                max: 5,
                isInt: true
            }
        },
        dates:{
            type:Sequelize.STRING,
            allowNull: false,
            validate:{ 
                notEmpty: true
            }
        	
        },
        requirement:{
            type:Sequelize.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        	
        },
        description:{
        	type:Sequelize.STRING,
        	allowNull: false,
        	validate: { 
                len:[0,1000], 
                notEmpty: false,
            }
        	
        }
        
    },{
        sequelize,
        modelName:"class_detail"
    })

    return ClassDetail
}