const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'c5b38a8bc7ad52',
    pass: 'bab7d286d693f6'
  }
});

transporter.sendMail({
  from: '"Seu Projeto" <test@meuprojeto.com>',
  to: 'fernandagatinha2@gmail.com',
  subject: 'Testando Mailtrap',
  text: 'Olá, Fernanda Gatinha. Assine nossa internt!',
  html: '<p><strong>Tudo bem? Podemos conversar?</strong> com <em>Mailtrap</em>.</p>'
})
.then(() => {
  console.log("E-mail enviado com sucesso para a caixa Mailtrap.");
})
.catch((err) => {
  console.error("Erro ao enviar e-mail:", err);
});
