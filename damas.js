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
    imgEl.classList.add('peca')
    
    if(i < 15)
        imgEl.src = 'img/white.png'
    
    else
        imgEl.src = 'img/black.png'

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

        /* TENTANDO IMPLEMENTAR MARCAÇÕES PARA MOVIMENTOS PERMITIDOS
        if(jogo.selecionado.children[0].src == "img/white.png")
            jogo.movimentosPossiveis = [casasEl[i + 7], casasEl[i + 9]]

        else if(jogo.selecionado.children[0].src == "img/black.png")
            jogo.movimentosPossiveis = [casasEl[i - 7], casasEl[i - 9]]

        jogo.movimentosPossiveis.forEach(jogo.movimentosPossiveis.classList.toggle('movimento-possivel'))
        */
        for(let j = 0; j < casasEl.length; ++j)
            if(casasEl[j] != jogo.selecionado)
                casasEl[j].classList.remove('selecionado')
        
        if(jogo.selecionado.classList != 'casa preta selecionado')
            jogo.selecionado = null
    }
}

for(let i = 0; i < casasEl.length; ++i)
    casasEl[i].addEventListener('click', () => selecionaPeca(i))