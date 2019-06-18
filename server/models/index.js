const sequelize = require("../sequelize")

const ClassAvailability = require('./classAvailability')(sequelize)
const ClassDetail = require('./ClassDetailModel')(sequelize)
const Class = require('./classes')(sequelize)
const MeetInfo = require('./meetInfo')(sequelize)
const Schedule = require('./ScheduleModel')(sequelize)
const Student = require('./student')(sequelize)
const Waitlist = require('./WaitlistModel')(sequelize)
const Blacklist = require('./BlacklistModel')(sequelize)

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

sequelize.sync()

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