const Sequelize = require('sequelize')
const Model = Sequelize.Model;

module.exports = function(sequelize) {

    class Blacklist extends Model {}
    Blacklist.init({

        token:{
            type: Sequelize.STRING,
            allowNull: false,
            validate:{       
                notEmpty: true
            }
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false
        },
        exp:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
       
    },
        {sequelize,modelName: 'Blacklist',timestamps: false}
    );

    return Blacklist
}