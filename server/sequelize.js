const Sequelize = require ('sequelize')
const jwt = require('express-jwt');
// Bad idea we know, but this will be replaced towards the end of the project
const sequelize = new Sequelize("postgres://alljbhcc:lL51Kg6uhEKJ_ApTj7Ji7gNQkrqpx80C@raja.db.elephantsql.com:5432/alljbhcc",
{
	define: { timestamps: false }
}
);


let jwtSetting = jwt({secret: 'shhhhhhared-secret'})
let settings = {
	sequelize: sequelize,
	jwt: jwtSetting
}
module.exports = sequelize