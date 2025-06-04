const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '29ae0b476a1744',
    pass: '942a8ffd5ab593'
  }
});

export function emailPagamento(nome, email, valor) {
  const message = {
  from: 'nao responda <equipegamerent@games.dev',
  to: `${email}`,
  subject: 'Confirmação de Pagamento',
  text: `Olá ${nome}`,
  html: '<p><strong>Tudo bem? Obrigado por assinar nosso serviço!</strong>' +
        '<p>A equipe da Game Rent agradece pela sua compra! Muito obrigado por escolher nossos serviços.</p>' +
        '<p>Estamos sempre disponiveis com novidades incriveis juntamente com promoções imperdiveis</p>' +
        '<p>acesse nossos canais de atendimentos e redes sociais e fique por dentro de tudo!</p>' +
        '<p>Stay gamer!</p>' +
        `<p>Valor do pagamento: R$ ${valor}</p>` +
        '<p>Se você tiver alguma dúvida ou precisar de assistência, não hesite em entrar em contato conosco.</p>' +
        '<p>Atenciosamente,</p>' +
        '<p>Equipe Game Rent</p>'
}

transporter.sendMail(message)
.then(() => {
  console.log("E-mail enviado com sucesso para a caixa Mailtrap.");
})
.catch((err) => {
  console.error("Erro ao enviar e-mail:", err);
});

}