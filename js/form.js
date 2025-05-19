const form = () => {
  // Seleciona o formulário de contato e o elemento que exibirá mensagens de resposta
  const contactForm = document.querySelector('.contactForm'),
    responseMessage = document.querySelector('.response')

  // Adiciona um ouvinte de evento para quando o formulário for enviado
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault() // Impede o comportamento padrão de envio da página
    const form = e.target // Obtém o elemento do formulário
    const formData = new FormData(form) // Cria um objeto com os dados do formulário

    // Mostra a mensagem de carregamento
    responseMessage.classList.add('open')
    responseMessage.textContent = 'Por favor, aguarde...'

    // Função assíncrona para enviar os dados para o backend
    async function getData() {
      try {
        const response = await fetch('mail.php', {
          method: 'POST', // Método HTTP usado
          body: formData, // Dados do formulário enviados
        })

        // Se a resposta não for bem-sucedida, mostra o texto resultante (pode causar erro aqui)
        if (!response.ok) {
          responseMessage.textContent = result // ⚠️ 'result' ainda não foi definido aqui — potencial erro
        }

        // Aguarda o texto retornado pelo servidor
        const result = await response.text()
        responseMessage.textContent = result // Mostra a mensagem do servidor
      } catch (error) {
        console.error(error.message) // Exibe erros no console
      }
    }

    // Chama a função getData e esconde a mensagem após 3 segundos
    getData()
      .then(
        setTimeout(() => {
          responseMessage.classList.remove('open')
        }, 3000)
      )
      .finally(form.reset()) // Limpa os campos do formulário
  })
}

export default form
