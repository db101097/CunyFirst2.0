const jwt = require('jsonwebtoken')
let jwtDecode = require('jwt-decode');
const Blacklist = require("../models")['Blacklist']
let check = (token) => {
	try {
		let decoded = jwt.verify(token, 'cunyfirst-sucks');
		return decoded
	} catch(err) {
		// console.log(err);
		return err
	}
}

let decodedToken = (token, res) => {
	try {

	let decoded = jwt.verify(token, 'cunyfirst-sucks')
		return decoded
	}
	catch(err){
		return err.message
	}
	
}

let revokeToken = (token, res) => {
	let decoded = jwt_decode(token);
	let email = decoded.email
	let exp = decoded.exp
	Blacklist.create({
		token,
		email,
		exp
	})
	.then(blacklist => { res.status(200).json({"message":"Token has been revoked"}) })
	.catch(err => { res.status(400).json({"message":"Could not revoke token"}) })
}
// authentication("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoibWF0dEBjdW55LmNvbSIsImlhdCI6MTU2MDc4MjIyNCwiZXhwIjoxNTYwNzg1ODI0fQ.IURIE4ZX-uEL_6AOKNXEIsUll6argCwZcrduK6sogMU")

let functions = {
	check: check,
	decodedToken: decodedToken,
	revokeToken: revokeToken
}
module.exports = functions