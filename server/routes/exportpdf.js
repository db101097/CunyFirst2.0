const PDFDocument=require('pdfkit')
const fs=require('fs')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'secondcuny@gmail.com',
    pass: 'Secondcuny23'
  }
});

let mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

module.exports=function(app){
    app.post('/exportSchedule',async function(req,res){
        
        try{
            console.log('here')
            let f=req.body.img
            const doc = new PDFDocument;
            doc.pipe(fs.createWriteStream('./pdfs/file.pdf'));
            doc.image(f, 0, 15, {width: 600,height:400});
            doc.end()

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            })
            res.status(200).send(f)
            }catch(error){
                console.log(error)
                res.status(400).send(error)
        }
    })
}