const bcrypt = require('bcrypt');
const validate = require("validate.js");
const Sequelize = require('../sequelize')
const Student = Sequelize.import("../models/student")

module.exports = function(app){
	app.get("/api/student",(req,res) => {
		return res.send("sdfsd")
	})

	app.post("/api/student/register",async (req,res) => {
		// console.log(models);
		const saltRounds = 10;
		const constraints = {
		  from: {
		    email: true
		  }
		};

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


		let hashPassword = await bcrypt.hash(password, saltRounds).then()

		// How to easily create an insert :) 
		Student.create(req.body)
		.then(student => {

			res.status(200).json({"payload":student})

		}).catch(err => {

			res.status(400).json({"message":err})

		})
		
		// Shouldn't reach here but giving a return anyways
		res.status(400).json({"message":"Unknown error"})
		
		
	})
}