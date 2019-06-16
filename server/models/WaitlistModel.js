const Sequelize = require('sequelize')
module.exports = function(sequelize) {
    class Waitlist extends Sequelize.Model {}
    Waitlist.init({
        position:{
            type:Sequelize.INTEGER,
            validate:{
                isInt: true
            }
        }
    },{
        sequelize,
        modelName:"waitlist"
    })

    return Waitlist
}