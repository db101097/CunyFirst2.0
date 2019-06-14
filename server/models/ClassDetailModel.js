const Sequelize = require('sequelize')
module.exports = function(sequelize) {
    class ClassDetail extends Sequelize.Model {}
    ClassDetail.init({
        status:{
            type:Sequelize.BOOLEAN,
            validate:{
                allowNull: false,
                notEmpty: true
            },
            
            defaultValue: true
        },
        session:{
        	type:Sequelize.STRING,
            validate:{
                allowNull: false,
                notEmpty: true,
            },
        	
        	defaultValue: "In Person"
        },
        credits:{
        	type:Sequelize.INTEGER,
        	
        	defaultValue: 0,
        	validate: { 
                min: 0,
                allowNull: false,
                notEmpty: true,
                max: 5 
            }
        },
        dates:{
        	type:Sequelize.STRING,
            validate:{
                allowNull: false,
                notEmpty: true
            }
        	
        },
        requirement:{
        	type:Sequelize.STRING,
            validate:{
                allowNull: false,
                notEmpty: true
            }
        	
        },
        description:{
        	type:Sequelize.STRING,
        	
        	validate: { 
                len:[0,1000], 
                allowNull: false,
                notEmpty: false,
            }
        	
        }
        
    },{
        sequelize,
        modelName:"class_detail"
    })

    return ClassDetail
}