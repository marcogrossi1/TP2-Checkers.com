let tabuleiroEl = document.querySelector('#tabuleiro')
let casasEl = document.querySelectorAll('.casa')

let jogo = {
    turno: 'branco',
    brancasFaltantes: 0,
    pretasFaltantes: 0,
    selecionado: null,
    movimentosPossiveis: [],
    contaMovimentos: 0
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

turnoEl.innerHTML = `Turno: ${jogo.turno}`
contaBrancaEl.innerHTML = `Brancas: ${jogo.brancasFaltantes}`
contaPretaEl.innerHTML = `Pretas: ${jogo.pretasFaltantes}`
contadorMovimentos.innerHTML = `Movimentos: ${jogo.contaMovimentos}`

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

const capturaPeca = (indexPecaAtual, indexPecaOponente) => {
        selecionaPeca(indexPecaAtual - indexPecaOponente)
        
        jogo.movimentosPossiveis.length = 0
        for(let j = 0; j < casasEl.length; ++j)
            casasEl[j].classList.remove('movimento-possivel')

        jogo.movimentosPossiveis = [casasEl[indexPecaAtual + indexPecaOponente]]
        jogo.movimentosPossiveis[0].classList.toggle('movimento-possivel')

        console.log(jogo.movimentosPossiveis)

        // Aplicando o conceito de recursividade para impedir que o usuário faça outro movimento que não a captura
        for(let j = 0; j < casasEl.length; ++j)
            casasEl[j].addEventListener('click', () => {
                if(casasEl[j] != jogo.movimentosPossiveis[0])
                    capturaPeca(indexPecaAtual, indexPecaOponente)
        })
}

const movimentaPeca = (i) => {
    if(casasEl[i] == jogo.movimentosPossiveis[0] || casasEl[i] == jogo.movimentosPossiveis[1]) {
        if(jogo.turno == 'branco' && jogo.selecionado.children[0].classList == 'peca-branca') {
            removeSelecao()
            removeImagem(i)
            criaPeca(casasEl[i], `branca`)
            
            jogo.turno = 'preto'
            jogo.contaMovimentos++

            turnoEl.innerHTML = `Turno: ${jogo.turno}`
            contaBrancaEl.innerHTML = `Brancas: ${jogo.brancasFaltantes}`
            contaPretaEl.innerHTML = `Pretas: ${jogo.pretasFaltantes}`
            contadorMovimentos.innerHTML = `Movimentos: ${jogo.contaMovimentos}`

            // Se, depois de feitas as mudanças, duas peças opostas se tocarem, será obrigatório a captura da peça
            // Assim, será adicionado um if que fará a análise de todas as peças para checar se deverá haver captura

            /* 
            
                if(casasEl[i+7].childElementCount == 7 && casasEl[i+7].children[0].classList == 'peca-preta')
                    if(casasEl[i+7+7].childElementCount == 0)

            */
        }
        
        else if(jogo.turno == 'preto' && jogo.selecionado.children[0].classList == 'peca-preta') {
            removeSelecao()
            removeImagem(i)                
            criaPeca(casasEl[i], `preta`)
            
            jogo.turno = 'branco'
            jogo.contaMovimentos++

            turnoEl.innerHTML = `Turno: ${jogo.turno}`
            contaBrancaEl.innerHTML = `Brancas: ${jogo.brancasFaltantes}`
            contaPretaEl.innerHTML = `Pretas: ${jogo.pretasFaltantes}`
            contadorMovimentos.innerHTML = `Movimentos: ${jogo.contaMovimentos}`

            console.log(i)

            if(casasEl[i-7].childElementCount == 1 && casasEl[i-7].children[0].classList == 'peca-branca') {
                if(casasEl[i+7].childElementCount == 0) {
                    capturaPeca(i, 7)
                }
            }

            else if(casasEl[i-9].childElementCount == 1 && casasEl[i-9].children[0].classList == 'peca-branca') {
                if(casasEl[i+9].childElementCount == 0) {
                    capturaPeca(i, 9)
                }
            }
        }
    }   
}

for(let i = 0; i < casasEl.length; ++i) {
    casasEl[i].addEventListener('click', () => {
            selecionaPeca(i)
            movimentaPeca(i)

        //Adicionar a funcionalidade 'comer peças'
    })
}