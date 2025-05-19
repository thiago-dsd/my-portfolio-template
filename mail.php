<?php
// Carrega as bibliotecas do PHPMailer necessárias para envio de e-mails via SMTP
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Define o título do e-mail
$title = "Nova mensagem";

// Captura os dados enviados pelo formulário via método POST
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Define o assunto e o corpo do e-mail
$subject = "Nova Mensagem";
$body = "Nome: $name\nEmail: $email\nMensagem:\n$message";

// Cria uma nova instância do PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  // Configurações básicas do servidor SMTP
  $mail->isSMTP();                    // Usa SMTP
  $mail->CharSet = "UTF-8";          // Codificação de caracteres
  $mail->SMTPAuth = true;            // Ativa autenticação SMTP

  // *** ESSA CONFIGURAÇÃO DEPENDE DE UM SERVIDOR FUNCIONAL ***
  // Essas credenciais e configurações devem ser alteradas de acordo com seu provedor de e-mail
  $mail->Host = 'smtp.example.com';         // Servidor SMTP (ex: smtp.gmail.com)
  $mail->Username = 'user@example.com';     // Nome de usuário SMTP
  $mail->Password = 'secret';               // Senha SMTP
  $mail->SMTPSecure = 'ssl';                // Tipo de criptografia
  $mail->Port = 465;                        // Porta SMTP (465 para SSL, 587 para TLS)

  // Define remetente e destinatário
  $mail->setFrom('from@example.com', $title);        // Remetente
  $mail->addAddress('youraddress@mail.me');          // Destinatário

  // Define o conteúdo do e-mail
  $mail->isHTML(true);                  // Define que o corpo será em HTML (pode ser false para texto simples)
  $mail->Subject = $title;              // Assunto do e-mail
  $mail->Body = $body;                  // Corpo do e-mail

  // Envia o e-mail
  $mail->send();

  // Se o envio for bem-sucedido, retorna status 200 e mensagem de sucesso
  http_response_code(200);
  echo "Mensagem enviada com sucesso!";
} catch (Exception $e) {
  // Em caso de erro, retorna status 500 e mensagem de erro
  http_response_code(500);
  echo "Ocorreu um erro no envio, tente novamente.";
}
