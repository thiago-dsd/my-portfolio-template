'use strict'

// Importa os módulos responsáveis pelo formulário e animação da barra de habilidades
import form from './form.js'
import skillbar from './skillbar.js'

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa a biblioteca AOS (animações ao rolar)
  AOS.init({
    once: true, // anima uma única vez
  })

  // Executa a função que lida com o envio do formulário
  form()

  // Ativa as animações das barras de habilidades
  skillbar()

  // Seleciona os elementos de navegação e botão de menu mobile
  const nav = document.querySelector('#nav')
  const navBtn = document.querySelector('#nav-btn')
  const navBtnImg = document.querySelector('#nav-btn-img')

  // Menu hambúrguer (abrir/fechar menu mobile)
  navBtn.onclick = () => {
    // Alterna a classe "open" na navegação
    if (nav.classList.toggle('open')) {
      // Altera o ícone para "fechar"
      navBtnImg.src = 'img/icons/close.svg'
    } else {
      // Altera o ícone para "abrir"
      navBtnImg.src = 'img/icons/open.svg'
    }
  }

  // Adiciona comportamento ao rolar a página
  window.addEventListener('scroll', function () {
    const header = document.querySelector('#header')
    const hero = document.querySelector('#home')

    // Define o ponto de ativação para tornar o header fixo
    let triggerHeight = hero.offsetHeight - 170

    // Verifica se a rolagem passou do ponto definido
    if (window.scrollY > triggerHeight) {
      // Adiciona classe que fixa o cabeçalho e mostra o botão "voltar ao topo"
      header.classList.add('header-sticky')
      goToTop.classList.add('reveal')
    } else {
      // Remove a classe se o usuário rolar de volta para cima
      header.classList.remove('header-sticky')
      goToTop.classList.remove('reveal')
    }
  })

  // Seleciona todas as seções da página e os links de navegação
  let sections = document.querySelectorAll('section')
  let navLinks = document.querySelectorAll('header nav a')

  // Atualiza o estado ativo dos links de navegação conforme a rolagem
  window.onscroll = () => {
    sections.forEach((sec) => {
      let top = window.scrollY
      let offset = sec.offsetTop - 170 // Compensação do header
      let height = sec.offsetHeight
      let id = sec.getAttribute('id')

      // Verifica se o scroll está dentro da seção atual
      if (top >= offset && top < offset + height) {
        // Remove classe 'active' de todos os links
        navLinks.forEach((links) => {
          links.classList.remove('active')

          // Adiciona classe 'active' ao link correspondente à seção visível
          document
            .querySelector('header nav a[href*=' + id + ']')
            .classList.add('active')
        })
      }
    })
  }
})
