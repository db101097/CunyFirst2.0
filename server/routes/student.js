const bcrypt = require('bcrypt');
const validate = require("validate.js");
const Sequelize = require('../sequelize')
const Student = Sequelize.import("../models/student")
const jwt = require('jsonwebtoken')
const saltRounds = 10;
const constraints = {
  from: {
    email: true
  }
};

module.exports = function(app, Student){
	app.get("/api/student",(req,res) => {
		Student.findAll().then(student => res.status(200).json({'payload':student}))
	})

	app.post("/api/student/register",async (req,res) => {



		let email = req.body.email
		let firstName = req.body.firstName
		let lastName = req.body.lastName
		let password = req.body.password
		let passwordConfirm = req.body.passwordConfirm
		let major = req.body.major

		if(password != passwordConfirm){
			res.status(400).json({"message":"Passwords do not match"})
		}

		// Interestingly, valid emails get returned as undefined
		if(validate({from:email},constraints) != undefined){
			res.status(400).json({"message":"Not valid email"})
		}

		let checkEmail = await Student.findAll({
			where:{
				email
			},
			raw: true
		}).then().catch((err)=>console.log(err))

		console.log("check", checkEmail)

		if(checkEmail.length > 0){
			return res.status(400).json({"message":"Email exists. Pick another one."})
		}

		let hashPassword = await bcrypt.hash(password, saltRounds).then()

		// Have to mess around with the original password to make the
		// below query easier. But if need access to the original password
		// then use passwordConfirm
		req.body.password = hashPassword
		// How to easily create an insert :)
		Student.create(req.body)
		.then(student => {

			let token = jwt.sign({
			  data: student.email
			}, "cunyfirst-sucks", { expiresIn: 60 * 60 });
			// console.log(token)
			res.status(200).json({"payload":token})

		}).catch(err => {

			res.status(400).json({"message":err})

		})

		// Shouldn't reach here but giving a return anyways
		// res.status(400).json({"message":"Unknown error"})


	})

	app.post("/api/student/login", async (req, res) => {


		let email = req.body.email
		let password = req.body.password

		// let hashPassword = await bcrypt.hash(password, saltRounds).then()
		// console.log(hashPassword);
		Student.findAll({
			where:{
				email,
				// password:hashPassword
			},
			raw:true
		})
		.then(async student => {

			console.log(student)
			if(student.length === 0){
				res.status(400).json({"message":"Wrong email/password"})
				// To make sure we don't call the functions below
				return
			}
			let result = await bcrypt.compare(password, student[0].password)
			// console.log(result);


			if(result){
				let token = jwt.sign({
				  data: student[0].email
				}, "cunyfirst-sucks", { expiresIn: 60 * 60 });
				res.status(200).json({"payload":token})

			}
			else{
				res.status(400).json({"message":"Wrong email/password"})
			}

		})

	})
}
