require('dotenv').config()
const sgMail = require('@sendgrid/mail')
const express=require('express')
const port= 3000 ||process.env.port
//librerías de twilio
const msg=require('./msg')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
//librerías de sendgrid
const mail= require('./mail')
//Realizar pruebas con postman
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//ruta del proyecto
app.get('/', (req,res)=>{
    res.json({message:'Success'})
})

app.post('/api/email/mailconfirmation',async(req,res,next)=>{
    try{
        res.json(await mail.enviarCodigo(req.body))
    }catch(err){
        next(err)
    }
})


app.get('/api/text/textconfirmation',async(req,res,next)=>{
    try{
        res.json(await msg.enviarText(req.body))
    }catch(err){
        next(err)
    }
})

app.get('/api/ws/wsconfirmation',(req,res,next)=>{
    try{
        res.json(client.messages
         .create({
           body: `Confirmación de su orden # ${req.body.orden} , Estado del pedido ${req.body.estado}`,
           from: 'whatsapp:+14155238886',
           to: 'whatsapp:+573014984295'
         })
         .then(message => console.log(`Mensaje enviado ${message.sid}`))
         );
        }catch(err){
            next(err)
        }   
})

app.use((err,req,res,next)=>{
    const statusCode= err.statusCode ||500
    console.error(err.message, err.stack)
    res.status(statusCode).json({'message': error.message})
    return
})

app.listen(port,()=>{
    console.log(`Accede al sitio desde: http://localohost/${port}`)
}) 
