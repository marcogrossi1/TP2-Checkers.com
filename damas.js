let tabuleiroEl = document.querySelector('#tabuleiro')
let casasEl = document.querySelectorAll('.casa')

let jogo = {
    turno: 'white',
    brancasFaltantes: 0,
    pretasFaltantes: 0,
    selecionado: null,
    movimentosPossiveis: [],
    contaMovimentos: 0
}

// Criando situação de início de jogo, com as peças dispostas pelo tabuleiro
const criaElemento = (i) => {
    let imgEl = document.createElement('img')
    
    
    if(i < 15) {
        imgEl.src = 'img/white.png'
        imgEl.classList.add('peca-branca')
    }
    else {
        imgEl.src = 'img/black.png'
        imgEl.classList.add('peca-preta')
    }

    casasEl[i].appendChild(imgEl)
}

for(let i = 0; i < casasEl.length; ++i) {
    if((i < 15) && (casasEl[i].classList == 'casa preta'))
        criaElemento(i);

    else if((i > 48 && i < 63) && (casasEl[i].classList == 'casa preta'))
        criaElemento(i);
}

// Criando seleção de peças
const selecionaPeca = (i) => {
    if(casasEl[i].childElementCount == 1) {
        jogo.selecionado = casasEl[i]
        jogo.selecionado.classList.toggle('selecionado')

        for(let j = 0; j < casasEl.length; ++j)
            if(casasEl[j] != jogo.selecionado)
                casasEl[j].classList.remove('selecionado')
        
        atualizaMovimentosPossiveis(i)

        if(jogo.selecionado.classList != 'casa preta selecionado') {
            jogo.selecionado = null
            jogo.movimentosPossiveis = []
        }
    }
}

for(let i = 0; i < casasEl.length; ++i)
    casasEl[i].addEventListener('click', () => selecionaPeca(i))

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
    if(retornaCorPeca(i) == 'branca')
        jogo.movimentosPossiveis = [casasEl[i+7], casasEl[i+9]]

    else if(retornaCorPeca(i) == 'preta')
        jogo.movimentosPossiveis = [casasEl[i-9], casasEl[i-7]]
}