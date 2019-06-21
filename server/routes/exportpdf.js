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

module.exports=function(app){
    app.post('/exportSchedule',async function(req,res){
        
        try{
            let f=req.body.img
            const doc = new PDFDocument;
            doc.pipe(fs.createWriteStream('./pdfs/file.pdf'));
            doc.image(f, 0, 15, {width: 600,height:400});
            doc.end()
           // console.log(req.body)
            
            let result=await transporter.sendMail({
              from: 'secondcuny@gmail.com',
              to: req.body.email,
              subject: 'Here Is Your Schedule',
              text: 'Your College Schdule',
              attachments: [{
                filename: 'schedule.pdf',
                path: './pdfs/file.pdf',
                contentType: 'application/pdf'
              }]
            })
            console.log(result)
            if(result!=null && result.rejected.length===0){
              res.status(200).send('success');
            }
        }catch(error){
                console.log(error)
                res.status(400).send('Failed to send email')
        }
    })
}