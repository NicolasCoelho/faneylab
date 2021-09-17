import sendEmail from '../../util/mailsender';

export default async (req, res) => {
  try {
    const { name, email, message } = await req.body

    try {
      let result = await sendEmail(
        'Dicuore Organiza <contact@faneylab.com>',
        'nicole@faneylab.com, nicolas@faneylab.com',
        'Dicuore Organiza <contact@faneylab.com>',
        'Novo contato',
        `Novo contato: nome: ${name} - email: ${email} - Mensagem: ${message}`,
        `<div style=" width: 600px; text-align: center; padding: 20px 15px;">
          <h1>Novo cadastro na newsletter</h1>
          <p style="width: 100%; margin-top: 10px; font-size: 18px;">
            <b>Nome:</b>&nbsp;<span>${name}</span>
          </p>
          <p style="width: 100%; margin-top: 10px; font-size: 18px;">
            <b>Email:</b>&nbsp;<span>${email}</span>
          </p>
          <p style="width: 100%; margin-top: 10px; font-size: 18px;">
            <b>Mensagem:</b>&nbsp; <br/> <span>${message}</span>
          </p>
        </div>`
      )
    } catch (error) {
        console.log(error)
    }
    res.status(200).json({success: true})
  } catch (err) {
    res.status(500).json(err)
  }
}