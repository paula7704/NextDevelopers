const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function sendText(orden, estado, destino,from){
 client.messages
   .create({
      body: `Confirmación de su orden # ${orden} , Estado del pedido ${estado}`,
      from: from,
      to: `+57${destino}`
    })
   .then(message => console.log(message.sid));
  }

 function sendWS(orden, estado, destino){
   
       client.messages
         .create({
           body: `Confirmación de su orden # ${orden} , Estado del pedido ${estado}`,
           from: 'whatsapp:+14155238886',
           to: `whatsapp:+57${destino}`
         })
         .then(message => console.log(`Mensaje enviado ${message.sid}`));
   
 }

 function WS(wsParams){
   try{
       sendWS(wsParams)
       return {message: 'Confirmación de código enviado'}
   }catch(err){
       const message='No se pudo enviar el correo'
       console.error(message)
       console.error(err)
       if(err.response) console.error(err.response.body)
       return{message}
   }
 }

(async()=>{
console.log('Enviando confirmación de orden')
await WS()
})

module.exports={WS}

async function enviarText(textParams){
  try{
      await sendText(textParams)
      return {message: 'Confirmación de código enviado'}
  }catch(err){
      const message='No se pudo enviar el código de confirmación de la orden'
      console.error(message)
      console.error(err)
      if(err.response) console.error(err.response.body)
      return{message}
  }
}

(async()=>{
console.log('Enviando confirmación de orden')
await enviarText()
})

module.exports={enviarText}