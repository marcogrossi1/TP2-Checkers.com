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
        jogo.selecionado = casasEl[i]
        jogo.selecionado.classList.toggle('selecionado')

        atualizaMovimentosPossiveis(i)

        // Removendo outras seleções
        for(let i = 0; i < casasEl.length; ++i)
            if(casasEl[i] != jogo.selecionado)
                casasEl[i].classList.remove('selecionado')

        // Removendo outros quadradinhos marcados
        for(let j = 0; j < casasEl.length; ++j)
            casasEl[j].classList.remove('movimento-possivel')

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

for(let i = 0; i < casasEl.length; ++i) {
    casasEl[i].addEventListener('click', () => {
        selecionaPeca(i)
        movimentaPeca(i)
    })
}

const removeSelecao = () => {
    for(let i = 0; i < casasEl.length; ++i) {
        casasEl[i].classList.remove('selecionado')
        casasEl[i].classList.remove('movimento-possivel')
    }

    jogo.movimentosPossiveis.length = 0
}

const removeImagem = (i) => {
    let img = casasEl[i].children[0]
    img.remove()
}

const criaPeca = (e, corPeca) => {
    let imgEl = document.createElement('img')
    imgEl.src = `img/${corPeca}.png`
    imgEl.classList.add(`peca-${corPeca}`)

    e.appendChild(imgEl)
}

const movimentaPeca = (i) => {
    if(jogo.turno == 'branco' && casasEl[i].children[0].classList == 'peca-branca') {
        for(let j = 0; j < jogo.movimentosPossiveis.length; ++j)
            jogo.movimentosPossiveis[j].addEventListener('click', (e) => {

                    removeSelecao()
                    removeImagem(i)
                    criaPeca(e.currentTarget, `branca`)

                    jogo.turno = 'preto'
                })
            }
        

    if(jogo.turno == 'preto' && casasEl[i].children[0].classList == 'peca-preta') {
        for(let j = 0; j < jogo.movimentosPossiveis.length; ++j)
            jogo.movimentosPossiveis[j].addEventListener('click', (e) => {
                removeSelecao()
                removeImagem(i)                
                criaPeca(e.currentTarget, `preta`)

                jogo.turno = 'branco'
            })
    }
}

/*
VEZ DO BRANCO
if(jogo.turno == 'branco' && casasEl[i].children[0].classList == 'peca-branca') {
    SE CLICAR EM UM DOS MOVIMENTOS POSSIVEIS:
        1) Desseleciona todas as casas (fazer jogo.selecionado = null / jogo.movimentosPossiveis.length = 0)
        2) Apaga a imagem na casa anterior (let imgApagar = casasEl[i].children[0] / imgApagar.remove())
        3) Coloca a imagem na nova casa (jogo.movimentosPossiveis[clicado])

VEZ DO PRETO
if(jogo.turno == 'preto' && casasEl[i].children[0].classList == 'peca-preta') {
    SE CLICAR EM UM DOS MOVIMENTOS POSSIVEIS:
        1) Desseleciona todas as casas (fazer jogo.selecionado = null / jogo.movimentosPossiveis.length = 0)
        2) Apaga a imagem na casa anterior (let imgApagar = casasEl[i].children[0] / imgApagar.remove())
        3) Coloca a imagem na nova casa (jogo.movimentosPossiveis[clicado])

*/