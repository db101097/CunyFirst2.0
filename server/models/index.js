const Sequelize = require ('sequelize')

const sequelize = new Sequelize("postgres://alljbhcc:lL51Kg6uhEKJ_ApTj7Ji7gNQkrqpx80C@raja.db.elephantsql.com:5432/alljbhcc",
{
	define: { timestamps: false }
}
);

const ClassAvailability = require('./classAvailability')(sequelize)
const ClassDetail = require('./ClassDetailModel')(sequelize)
const Class = require('./classes')(sequelize)
const MeetInfo = require('./meetInfo')(sequelize)
const Schedule = require('./ScheduleModel')(sequelize)
const Student = require('./student')(sequelize)
const Waitlist = require('./WaitlistModel')(sequelize)

Class.hasOne(ClassDetail)
ClassDetail.belongsTo(Class)

Class.hasOne(ClassAvailability)
ClassAvailability.belongsTo(Class)

Class.hasOne(MeetInfo)
MeetInfo.belongsTo(Class)

Schedule.belongsTo(Class)
Schedule.belongsTo(Student)

Waitlist.belongsTo(Class)
Waitlist.belongsTo(Student)

// sequelize.sync()

module.exports = sequelize