const Sequelize = require ('sequelize')

const sequelize = new Sequelize("postgres://alljbhcc:lL51Kg6uhEKJ_ApTj7Ji7gNQkrqpx80C@raja.db.elephantsql.com:5432/alljbhcc",
{
	define: { timestamps: false }
}
);

module.exports = sequelize