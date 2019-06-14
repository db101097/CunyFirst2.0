const Sequelize = require('sequelize')
module.exports = function(sequelize) {
    class Waitlist extends Sequelize.Model {}
    Waitlist.init({
        sid:{
        	type:Sequelize.INTEGER
        },
        classId:{
        	type:Sequelize.INTEGER
        }
        
    },{
        sequelize,
        modelName:"waitlist"
    })

    return Waitlist
}