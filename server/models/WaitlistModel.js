const Sequelize = require('sequelize')
module.exports = function(sequelize) {
    class Waitlist extends Sequelize.Model {}
    Waitlist.init({
        position:{
            type:Sequelize.INTEGER,
            allowNull:false,
        	validate: { 
                min: 1,
                notEmpty: true,
                isInt: true
            }
        },
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        }
    },{
        sequelize,
        modelName:"waitlist"
    })

    return Waitlist
}