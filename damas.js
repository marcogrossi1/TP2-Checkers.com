let tabuleiroEl = document.querySelector('#tabuleiro')
let loginEl = document.querySelector('#login')
let infoEl = document.querySelector('#info')
let botaoJogarEl = document.querySelector('#botao-jogar')

tabuleiroEl.classList.add('desativado')
tabuleiroEl.style.display = 'none'
infoEl.classList.add('desativado')

let jogador1El = document.querySelector('#jogador1-elemento')
let jogador2El = document.querySelector('#jogador2-elemento')

// Criando a opção 'cadastro', que registrará o nome dos jogadores em um sessionStorage
botaoJogarEl.addEventListener('click', () => {
    let jogador1 = document.querySelector('#jogador1')
    let jogador2 = document.querySelector('#jogador2')

    sessionStorage.setItem('jogador1', jogador1.value)
    sessionStorage.setItem('jogador2', jogador2.value)
    
    loginEl.classList.add('desativado')
    loginEl.style.display = 'none'
    
    tabuleiroEl.classList.remove('desativado')
    tabuleiroEl.style.display = ''
    infoEl.classList.remove('desativado')

    jogador1El.classList.remove('desativado')
    jogador2El.classList.remove('desativado')
})

jogador1El.innerHTML = `<h3>${sessionStorage.getItem('jogador1')}</h3>`
jogador2El.innerHTML = `<h3>${sessionStorage.getItem('jogador2')}</h3>`

let botaoJogarNovamenteEl = document.querySelector('#jogar-novamente')

botaoJogarNovamenteEl.addEventListener('click', () => {
    location.reload()
})

// Implementação do jogo
let casasEl = document.querySelectorAll('.casa')

let jogo = {
    turno: 'branca',
    brancasCapturadas: 0,
    pretasCapturadas: 0,
    selecionado: null,
    movimentosPossiveis: [],
    contaMovimentos: 0,
    captura: {
        indexPecaCapturada: -1,
        isTrue: false
    },
    vencedor: '',
    dama: {
        pretas: [],
        brancas: []
    }
}

// Criando situação de início de jogo, com as peças dispostas pelo tabuleiro
const criaTabuleiro = (i) => {
    let imgEl = document.createElement('img')

    if(i < 15) {
        imgEl.src = 'img/branca.png'
        imgEl.classList.add('peca-branca')
    }
    else {
        imgEl.src = 'img/preta.png'
        imgEl.classList.add('peca-preta')
    }

    casasEl[i].appendChild(imgEl)
}

for(let i = 0; i < casasEl.length; ++i) {
    if((i < 15) && (casasEl[i].classList == 'casa preta'))
        criaTabuleiro(i);

    else if((i > 48 && i < 63) && (casasEl[i].classList == 'casa preta'))
        criaTabuleiro(i);
}

// Iniciando turnos e conta-peças
let turnoEl = document.querySelector('#turno')
let contaPretaEl = document.querySelector('#conta-preta')
let contaBrancaEl = document.querySelector('#conta-branca')
let contadorMovimentos = document.querySelector('#conta-movimentos')
let vitoriaBox = document.querySelector('#vitoria-box')

turnoEl.innerHTML = `Turno: <img src='img/${jogo.turno}.png' width = 30px>`
contaBrancaEl.innerHTML = `<img src='img/branca.png' width = 30px>: ${jogo.brancasCapturadas}`
contaPretaEl.innerHTML = `<img src='img/preta.png' width = 30px>: ${jogo.pretasCapturadas}`
contadorMovimentos.innerHTML = `Movimentos: ${jogo.contaMovimentos}`
vitoriaBox.style.opacity = 0

// Criando movimentos possíveis
const existePeca = (i) => {
    if(casasEl[i].childElementCount == 1) {
        return true
    }

    return false
}

const retornaCorPeca = (i) => {
    if(existePeca(i) == true) {
        let pecaEl = casasEl[i].children[0]
        
        if(pecaEl.classList == 'peca-preta')
            return 'preta'
        
        else 
            return 'branca'
    }
}

const atualizaMovimentosPossiveis = (i) => {
    jogo.movimentosPossiveis.length = 0

    if(retornaCorPeca(i) == 'branca') {
        if(casasEl[i+7].classList != 'casa branca' && casasEl[i+7].childElementCount == 0)
            jogo.movimentosPossiveis.push(casasEl[i+7])
        
        if(casasEl[i+9].classList != 'casa branca' && casasEl[i+9].childElementCount == 0)
            jogo.movimentosPossiveis.push(casasEl[i+9])
    }

    else if(retornaCorPeca(i) == 'preta') {
        if(casasEl[i-7].classList != 'casa branca' && casasEl[i-7].childElementCount == 0)
            jogo.movimentosPossiveis.push(casasEl[i-7])
        
        if(casasEl[i-9].classList != 'casa branca' && casasEl[i-9].childElementCount == 0)
            jogo.movimentosPossiveis.push(casasEl[i-9])
    }
}

// Criando seleção de peças e aplicando "movimentos possíveis"
const selecionaPeca = (i) => {
    if(casasEl[i].childElementCount == 1) {
        // SELECIONADO
        removeSelecao()

        // Adicionando cor à selecão
        jogo.selecionado = casasEl[i]
        casasEl[i].classList.toggle('selecionado')

        // MOVIMENTOS POSSÍVEIS
        for(let j = 0; j < casasEl.length; ++j)
            casasEl[j].classList.remove('movimento-possivel')

        atualizaMovimentosPossiveis(i)

        // Caso haja a seleção da mesma casa, a casa é "desselecionada" e não existem movimentos possíveis
        if(jogo.selecionado.classList == 'casa preta') {
            jogo.movimentosPossiveis.length = 0
            jogo.selecionado = null
        }

        // Adicionando cor aos movimentos possíveis
        for(let i = 0; i < jogo.movimentosPossiveis.length; ++i)
            jogo.movimentosPossiveis[i].classList.toggle('movimento-possivel')
    }
}

const removeSelecao = () => {
    for(let i = 0; i < casasEl.length; ++i) {
        casasEl[i].classList.remove('selecionado')
        casasEl[i].classList.remove('movimento-possivel')
    }

    jogo.movimentosPossiveis.length = 0
}

const removeImagem = (i) => {
    let img = jogo.selecionado.children[0]
    img.remove()
}

const criaPeca = (e, corPeca) => {
    let imgEl = document.createElement('img')
    imgEl.src = `img/${corPeca}.png`
    imgEl.classList.add(`peca-${corPeca}`)

    e.appendChild(imgEl)
}

const selecionaCaptura = (indexPecaAtual, indexPecaOponente) => {
    jogo.captura.indexPecaCapturada = indexPecaOponente

    selecionaPeca(indexPecaAtual - indexPecaOponente)
        
    jogo.movimentosPossiveis.length = 0
    for(let j = 0; j < casasEl.length; ++j)
        casasEl[j].classList.remove('movimento-possivel')

    jogo.movimentosPossiveis = [casasEl[indexPecaAtual + indexPecaOponente]]
    jogo.movimentosPossiveis[0].classList.toggle('movimento-possivel')

    jogo.captura.isTrue = true

    //casasEl[indexPecaAtual].children[0].remove()

    // Aplicando o conceito de recursividade para impedir que o usuário faça outro movimento que não a captura
    //for(let j = 0; j < casasEl.length; ++j)
    //    casasEl[j].addEventListener('click', function myCallback () {
    //        if(casasEl[j] != jogo.movimentosPossiveis[0])
    //            selecionaCaptura(indexPecaAtual, indexPecaOponente)
    //    })   
}

const capturaPeca = (indexPecaComida) => {
    if(casasEl[indexPecaComida].children[0].classList == 'peca-preta')
        jogo.pretasCapturadas++
    else
        jogo.brancasCapturadas++

    casasEl[indexPecaComida].children[0].remove()

    jogo.captura.isTrue = false
    jogo.captura.indexPecaCapturada = -1
}

const movimentaPeca = (i) => {
    if(casasEl[i] == jogo.movimentosPossiveis[0] || casasEl[i] == jogo.movimentosPossiveis[1]) {
        if(jogo.turno == 'branca' && jogo.selecionado.children[0].classList == 'peca-branca') {
            removeSelecao()
            removeImagem(i)
            criaPeca(casasEl[i], `branca`)
            
            jogo.turno = 'preta'
            jogo.contaMovimentos++

            turnoEl.innerHTML = `Turno: <img src='img/${jogo.turno}.png' width = 30px>`
            contaBrancaEl.innerHTML = `<img src='img/branca.png' width = 30px>: ${jogo.brancasCapturadas}`
            contaPretaEl.innerHTML = `<img src='img/preta.png' width = 30px>: ${jogo.pretasCapturadas}`
            contadorMovimentos.innerHTML = `Movimentos: ${jogo.contaMovimentos}`

            if(i < 63-7)
            if(casasEl[i+7].childElementCount == 1 && casasEl[i+7].children[0].classList == 'peca-preta') {
                if(casasEl[i-7].childElementCount == 0 && casasEl[i-7].classList == 'casa preta')
                    selecionaCaptura(i, -7)
            }

            if(i < 63-9)
            if(casasEl[i+9].childElementCount == 1 && casasEl[i+9].children[0].classList == 'peca-preta') {
                if(casasEl[i-9].childElementCount == 0 && casasEl[i-9].classList == 'casa preta')
                    selecionaCaptura(i, -9)
            }


            //for(let j = 0; j < casasEl.length; ++j) {
            //    if(casasEl[j].childElementCount == 1 && casasEl[j].children[0].classList == 'peca-branca') {
            //        if(casasEl[j+7].childElementCount == 1 && casasEl[j+7].children[0].classList == 'peca-preta') {
            //            if(casasEl[j-7].childElementCount == 0 && casasEl[j-7].classList == 'casa preta')
            //                selecionaCaptura(j + 7, 7)
            //        }
            //        else if(casasEl[j+9].childElementCount == 1 && casasEl[j+9].children[0].classList == 'peca-preta') {
            //            if(casasEl[j-9].childElementCount == 0 && casasEl[j-9].classList == 'casa preta') {
            //                selecionaCaptura(j + 9, 9)
            //                console.log('legal')
            //            }
            //        }
            //    }
            //}
        }
        
        else if(jogo.turno == 'preta' && jogo.selecionado.children[0].classList == 'peca-preta') {
            removeSelecao()
            removeImagem(i)                
            criaPeca(casasEl[i], `preta`)
            
            jogo.turno = 'branca'
            jogo.contaMovimentos++

            turnoEl.innerHTML = `Turno: <img src='img/${jogo.turno}.png' width = 30px>`
            contaBrancaEl.innerHTML = `<img src='img/branca.png' width = 30px>: ${jogo.brancasCapturadas}`
            contaPretaEl.innerHTML = `<img src='img/preta.png' width = 30px>: ${jogo.pretasCapturadas}`
            contadorMovimentos.innerHTML = `Movimentos: ${jogo.contaMovimentos}`

            if(i > 0 + 7)
            if(casasEl[i-7].childElementCount == 1 && casasEl[i-7].children[0].classList == 'peca-branca') {
                if(casasEl[i+7].childElementCount == 0 && casasEl[i+7].classList == 'casa preta') {
                    selecionaCaptura(i, 7)
                }
            }   

            if(i > 0 + 9)
            if(casasEl[i-9].childElementCount == 1 && casasEl[i-9].children[0].classList == 'peca-branca') {
                if(casasEl[i+9].childElementCount == 0 && casasEl[i+9].classList == 'casa preta') {
                    selecionaCaptura(i, 9)
                }
            }
            
        }
    }
}

const criaDama = (i) => {
    if(i == 1 || i == 3 || i == 5 || i ==7)
        if(casasEl[i].children[0].classList == 'peca-preta') {
            casasEl[i].children[0].src = 'img/blackdama.png'
            casasEl[i].children[0].classList.add('dama')

            jogo.dama.pretas.push(casasEl[i])
        }

    if(i == 62 || i == 60 || i == 58 || i == 56)
        if(jogo.selecionado.children[0].classList == 'peca-branca') {
            casasEl[i].children[0].src = `img/whitedama.png`
            casasEl[i].children[0].style.width = '50px'
            casasEl[i].children[0].classList.add('dama')

            jogo.dama.brancas.push(casasEl[i])
        }
}

const atualizaMovimentosPossiveisDama = (i) => {
    if(casasEl[i].children[0].classList == 'peca-preta dama') {
        jogo.movimentosPossiveis = [casasEl[i + 7], casasEl[i + 9]]
    }

    else if(casasEl[i].children[0].classList == 'peca-branca dama') {
        jogo.movimentosPossiveis = [casasEl[i - 7], casasEl[i - 9]]
    }
}

const movimentaDama = (i) => {
    if(casasEl[i] == jogo.movimentosPossiveis[0] || casasEl[i] == jogo.movimentosPossiveis[1] || casasEl[i] == jogo.movimentosPossiveis[2] || casasEl[i] == jogo.movimentosPossiveis[3]) {
        if(jogo.selecionado.children[0].classList == 'peca-preta dama') {
            removeSelecao()
            removeImagem()

            criaPeca(casasEl[i], `blackdama`)

            jogo.turno = 'branca'
            jogo.contaMovimentos++

            turnoEl.innerHTML = `Turno: <img src='img/${jogo.turno}.png' width = 30px>`
            contaBrancaEl.innerHTML = `<img src='img/brnca.png' width = 30px>: ${jogo.brancasCapturadas}`
            contaPretaEl.innerHTML = `<img src='img/preta.png' width = 30px>: ${jogo.pretasCapturadas}`
            contadorMovimentos.innerHTML = `Movimentos: ${jogo.contaMovimentos}`

        }
    }
}

const exibeVencedor = (vencedor) => {
    jogo.vencedor = vencedor

    vitoriaBox.classList.remove('desativado')
    vitoriaBox.style.display = 'inline'
    vitoriaBox.style.opacity = 1

    let timeVencedor = document.querySelector('#time-vencedor')
    let jogadorVencedor = (vencedor == 'preta') ? 'jogador2' : 'jogador1'
    timeVencedor.innerHTML = sessionStorage.getItem(jogadorVencedor) + `<img src='img/${jogo.vencedor}.png' width = 45px>` + ' venceu!!!'

    tabuleiroEl.classList.add('desativado')
    tabuleiroEl.style.display = 'none'
    infoEl.classList.add('desativado')
    jogador1El.classList.add('desativado')
    jogador2El.classList.add('desativado')
}

for(let i = 0; i < casasEl.length; ++i) {
    casasEl[i].addEventListener('click', () => {
        if(jogo.captura.isTrue == true)
            capturaPeca(i-jogo.captura.indexPecaCapturada)    
        
        selecionaPeca(i)
        movimentaPeca(i)

        if(jogo.brancasCapturadas == 8) {
            exibeVencedor('preta')
        }

        else if(jogo.pretasCapturadas == 8) {
            exibeVencedor('branca')
        }

        // Iniciando a implementação da peça 'dama'
        criaDama(i)
        atualizaMovimentosPossiveisDama(i)
        movimentaDama(i)
    })
}