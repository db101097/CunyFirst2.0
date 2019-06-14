const Sequelize = require('sequelize')
module.exports = function(sequelize) {
    class ScheduleModel extends Sequelize.Model {}
    ScheduleModel.init({
        
        sid:{
        	type:Sequelize.INTEGER
        },
        classId:{
        	type:Sequelize.INTEGER
        }
    },{
        sequelize,
        modelName:"schedule"
    })

    return ScheduleModel
}