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
            console.log(req.body)
            
            transporter.sendMail({
              from: 'secondcuny@gmail.com',
              to: req.body.email,
              subject: 'Here Is Your Schedule',
              text: 'Your College Schdule',
              attachments: [{
                filename: 'schedule.pdf',
                path: './pdfs/file.pdf',
                contentType: 'application/pdf'
              }],
              function(err, info) {
                if (err) {
                  console.error(err);
                  res.status(400).send(err);
                } else {
                  console.log(info);
                  res.status(200).send('success');
                }
              }
            });
            //res.status(200).send('success');
            }catch(error){
                console.log(error)
                res.status(400).send(error)
        }
    })
}