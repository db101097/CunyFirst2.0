const Sequelize = require('sequelize')
module.exports = function(sequelize) {
    class Waitlist extends Sequelize.Model {}
    Waitlist.init({
        
    },{
        sequelize,
        modelName:"waitlist"
    })

    return Waitlist
}