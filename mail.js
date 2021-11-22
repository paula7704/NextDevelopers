//Mail con SendGrid
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//     to: 'javiervivas1019@hotmail.com',
//     from: 'javiervivas1019@gmail.com', 
//     subject: 'SendGrid con Node.Js',
//     text: 'Mensaje de prueba ciclo4',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   };

//   sgMail
//   .send(msg)
//   .then(() =>  {
//     console.log('Email enviado')
// })
//   .catch((error)=>{
//       console.error(error)
//   })


function sendEmailHTML(nombre,orden,estado){
    return `<!DOCTYPE html>
    <html>
    <head>
    <title>Page Title</title>
            <style>
                .container {
                    margin: 50px 50px 50px 50px;
                      display: grid;
                      grid-template-columns: 1fr 1fr;
                      grid-auto-rows: minmax(50px, auto);
    grid-gap:1em;               
    
                }
                .container > img {
                    width: 250px;
                    grid-row: 1;
                    
                }
                .container > h1 {
                    grid-row: 1;                
                }
                 .fecha {
                    grid-row: 2;                
                }
                .foot {
                    grid-row: 4;
                    grid-column: 1/3;                
                    color: white;
    background-color: rgb(62, 62, 62);
                }
                .container > table {
      grid-row: 3;  
      border-collapse: collapse;
      width: 100%;
    }
    
                .cuadro {
    grid-row: 3;
    color: white;
    background-color: rgb(62, 62, 62);
    }
    
    td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
      color: white;
    background-color: rgb(62, 62, 62);
    }
    </style>
    </head>
    <body>
    <div class="container">
    <img src="https://i.ibb.co/rbk7JQG/Constructora.png" alt="Logo Constructora">
    <h3 class="fecha">Fecha: 2021/11/20</h3>
    <h1>Información de pedido</h1>
    <div class="cuadro">
    <h3>PEDIDO N°1</h3>
    <h3>OBRA: Los Cocos</h3>
    <h3>PEDIDO POR: Director de obra</h3>
    <h3>ESTADO DEL PEDIDO: Pedido</h3>
    </div>
    <table>
      <tr>
        <th>Material</th>
        <th>Unidad</th>
        <th>Cantidad</th>
      </tr>
      <tr>
        <td>Yee Doble 2" Sanit</td>
        <td>Unidad</td>
        <td>20</td>
      </tr>
      <tr>
        <td>Acero figurado 3/8"</td>
        <td>Kg</td>
        <td>1.000</td>
      </tr>
      <tr>
        <td>Bota de platina No.39</td>
        <td>Par</td>
        <td>2</td>
      </tr>
      <tr>
        <td>Clavo común 3"</td>
        <td>Libra</td>
        <td>15</td>
      </tr>
      <tr>
        <td>Cemento x50KG</td>
        <td>Bulto</td>
        <td>30</td>
      </tr>
    </table>
    <h4 class="foot">Líneas de atención en Bogotá (xx-x) xxx xxxx o en el resto del país xx xxxx xx xx xx
    Si deseas contactarnos, puedes escribirnos a servicliente@constructora.com.co</h4>
    </body>
    </html>
    
    
    `
}

function getMessage(emailParams){
    return{
        to: emailParams.toEmail,
        from: 'javiervivas1019@gmail.com', 
        subject: 'Confirmación de Orden de compra',
        text: `Hola ${emailParams.nombre}te informamos que la orden # ${emailParams.orden} se realizó correctamente y se encuentra en ${emailParams.estado}`,
        html: sendEmailHTML(emailParams.nombre,emailParams.orden, emailParams.estado)
    }

}

async function enviarCodigo(emailParams){
    try{
        await sgMail.send(getMessage(emailParams))
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
  console.log('Enviando correo electrónico')
  await sendEmailHTML()
})

module.exports={enviarCodigo}
