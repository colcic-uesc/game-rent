import nodemailer from "nodemailer";
import { faker } from "@faker-js/faker";

const transporter = nodemailer.createTransport({
   host: process.env.API_EMAIL_HOST,
   port: process.env.API_EMAIL_PORT,
   auth: {
      user: process.env.API_EMAIL_USER,
      pass: process.env.API_EMAIL_PASS,
   },
});

export function emailPagamento(nome, email, valor) {
   const videogameAccount = faker.internet.email();
   const videogameAccountPass = faker.internet.password();

   const message = {
      from: "nao responda <equipegamerent@games.dev",
      to: `${email}`,
      subject: "Confirmação de Pagamento",
      text: `Olá ${nome}`,
      html:
         `<p><strong>Olá ${nome}. Tudo bem? Obrigado por utilizar nossos serviços!</strong>` +
         "<p>A equipe da Game Rent agradece pela sua compra! Muito obrigado por escolher nossos serviços.</p>" +
         "<p>Estamos sempre disponiveis com novidades incriveis juntamente com promoções imperdiveis</p>" +
         "<p>acesse nossos canais de atendimentos e redes sociais e fique por dentro de tudo!</p>" +
         "<p><strong>Stay gamer!</strong></p><br>" +
         `<p>Valor do pagamento: R$ ${valor}</p>` +
         `<p>A sua conta de acesso é: <br><strong>Email</strong>: ${videogameAccount}<br><strong>Senha</strong>: ${videogameAccountPass}.</p>` +
         "<p>Não compartilhe a conta com mais ninguém! Caso contrário, seu acesso pode ser revogado.</p>" +
         "<p>Se você tiver alguma dúvida ou precisar de assistência, não hesite em entrar em contato conosco.</p>" +
         "<p>Atenciosamente,</p>" +
         "<p>Equipe Game Rent</p>",
   };

   transporter
      .sendMail(message)
      .then(() => {
         console.log("E-mail enviado com sucesso para a caixa Mailtrap.");
      })
      .catch((err) => {
         console.error("Erro ao enviar e-mail:", err);
      });
}
