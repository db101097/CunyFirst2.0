const Sequelize = require ('sequelize')

const sequelize = new Sequelize("postgres://lulylais:0pMYbvDCzD64DklyVmSZqql9n7HRqzTt@raja.db.elephantsql.com:5432/lulylais",
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

Waitlist.findAll({})
.then((results)=>{
	//console.log('result',results)
})

sequelize.sync();

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })

let models = {
	classAvailability:ClassAvailability,
	classDetail:ClassDetail,
	Class:Class ,
	meetInfo:MeetInfo,
	schedule:Schedule,
	student:Student,
	waitList:Waitlist 
}

module.exports = models;