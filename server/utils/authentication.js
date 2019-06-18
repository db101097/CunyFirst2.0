const jwt = require('jsonwebtoken')
let authentication = (token) => {
	try {
		let decoded = jwt.verify(token, 'unyfirst-sucks');
		return decoded
	} catch(err) {
		// console.log(err);
		return err
	}
}
// authentication("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoibWF0dEBjdW55LmNvbSIsImlhdCI6MTU2MDc4MjIyNCwiZXhwIjoxNTYwNzg1ODI0fQ.IURIE4ZX-uEL_6AOKNXEIsUll6argCwZcrduK6sogMU")
module.exports = authentication