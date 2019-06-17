const Sequelize = require('sequelize')
module.exports = function(sequelize) {
    class ScheduleModel extends Sequelize.Model {}
    ScheduleModel.init({
        
    },{
        sequelize,
        modelName:"schedule"
    })

    return ScheduleModel
}