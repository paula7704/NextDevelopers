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
        <meta charset="utf-8">
        <title>Orden de compra</title>
      </head>
      <body>
      
        <table border="1" style=”width: 100%”>
			<caption>Detalle de Orden</caption>
			<colgroup>
				<col style="width: 20%"/>
				<col style="width: 40%"/>
				<col style="width: 40%"/>
			</colgroup>
			<thead>
				<tr>
					<th rowspan="2">Orden N°</th>
					<th colspan="2">Detalle del pedido actual</th>
				</tr>
				<tr>
					<th>Nombre del empleado</th>
					<th>Estado Pedido</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<td colspan="3">Observaciones.</td>
				</tr>
			</tfoot>
			<tbody>
				<tr>
					<th>${orden}</th>
					<td>${nombre}</td>
					<td>${estado}</td>
				</tr>
				<tr>
        <th>${orden}</th>
        <td>${nombre}</td>
        <td>${estado}</td>
				</tr>
			</tbody>
		</table>

        <img src="./img/Orden01.jpg" alt="">
      </body>
    </html>`
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
