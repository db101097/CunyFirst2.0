const Sequelize = require('sequelize')
const Model = Sequelize.Model;

module.exports = function(sequelize) {

        class classAvailablility extends Model {}
        classAvailablility.init({

            capacity:{
                type: Sequelize.Integer,
                allowNull: false,
                validate:{
                    isInt: true,           
                    notEmpty: true
                }
            },
            enrollmentTotal:{
                type: Sequelize.Integer,
                allowNull: false,
                validate:{
                    isInt: true,           
                    notEmpty: true
                }
            },
            waitListCapacity:{
                type: Sequelize.Integer,
                allowNull: false,
                validate:{
                    isInt: true,           
                    notEmpty: true
                }
            },
            waitListTotal:{
                type: Sequelize.Integer,
                allowNull: false,
                validate:{
                    isInt: true,           
                    notEmpty: true
                }
            }
        },
            {sequelize,modelName: 'classAvailability',timestamps: false}
        );
}