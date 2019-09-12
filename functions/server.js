const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const router = express.Router();
const functions = require('firebase-functions');
const smtpTransport = require('nodemailer-smtp-transport');
const cors = require("cors")({
  origin: true
});
/*const cors = require("cors")({
    origin: true
  });
*/
const app = express();
app.locals.layout = false;
//View engine setup
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

//Static folder
app.use('public/assets', express.static(path.join(__dirname,'assets')));
app.get('/',(req,res)=>{
    //res.sendFile(path.join(__dirname+'/index.html'));
    res.render('index', {layout: false});
});
app.get('/fono',(req,res)=>{
    res.render('fono');
});
app.get('/servicios',(req,res) =>{
    
    res.render('servicios');
});
app.get('/convenios',(req,res) => {
    
    res.render('convenios');
});
app.get('/contactenos',(req,res)=> {
    res.redirect('/#contacto');
});
app.get('/contact', (req,res) => {
    res.render('contact');
});
app.use('/', router);
//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/*
app.post('/send',(req,res) => {

    const output = `
    <p>Tienes una nueva solicitud</p>
    <h4>Detalles de contacto</h4>
    <ul>
    <li>Nombre: ${req.body.nombre}</li>
    <li>Rut: ${req.body.rut}</li>
    <li>Mail: ${req.body.email}</li>
    <li>Contacto: ${req.body.numerocontacto}</li>
    <li>Convenio: ${req.body.convenio}</li>
    <ul>
    <h4>Mensaje</h4>
    <p>${req.body.mensaje}</p>
     `;
     
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
        user: 'espaciovidainclusiva@gmail.com', 
        pass: 'Masaifono123'  
    },
    
  });
  let mailOptions = {
      from: '"Solicitud Vida Inclusiva" <espaciovidainclusiva@gmail.com>', 
      to: 'espaciovidainclusiva@gmail.com', 
      subject: 'Solicitud Reserva', 
      text: 'Hello world?', 
      html: output 
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
     /* console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.render('contact', {msg:'Email ha sido enviado, nos comunicaremos contigo a la brevedad.'});
      
  });
  });*/
  app.post('/send-email',(req, res) => {
    const output = `
    <p>Tienes una nueva solicitud</p>
    <h4>Detalles de contacto</h4>
    <ul>
    <li>Nombre: ${req.body.nombre}</li>
    <li>Rut: ${req.body.rut}</li>
    <li>Mail: ${req.body.email}</li>
    <li>Contacto: ${req.body.numerocontacto}</li>
    <li>Convenio: ${req.body.convenio}</li>
    <ul>
    <h4>Mensaje</h4>
    <p>${req.body.mensaje}</p>
     `;
    let transporter = nodeMailer.createTransport({
      service:'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
           user: 'espaciovidainclusiva@gmail.com',
           pass: 'Masaifono123'
      }
});
   let mailOptions = {
    from: '"Solicitud Vida Inclusiva" <espaciovidainclusiva@gmail.com>', 
    to: 'espaciovidainclusiva@gmail.com', 
    subject: 'Solicitud Reserva', 
    text: 'Hello world?', 
    html: output 
};
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log("Message send Successfully");
  res.render('index');
});
});
  

//app.listen(process.env.port || 3000);
//console.log('Server started...');
exports.app = functions.https.onRequest(app);

