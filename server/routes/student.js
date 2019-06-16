const bcrypt = require('bcrypt');
const validate = require("validate.js");

module.exports = function(app){
	app.get("/api/student",(req,res) => {
		return res.send("sdfsd")
	})

	app.post("/api/student/register",async (req,res) => {
		
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

		if(password != passwordConfirm){
			res.status(400).json({"message":"Passwords do not match"})
		}

		console.log("tst", validate({from:"sdfsdfsd"},constraints));


		let hashPassword = await bcrypt.hash(password, saltRounds).then()

		console.log(hashPassword);

		
	})
}