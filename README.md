# Checkers.com

![Screenshot do resultado final](img/screenshots/tela_inteira.png)

## O projeto

Este projeto foi criado para atender às demandas da disciplina 'Laboratório de Programaçao Web' (1° ano do curso técnico em Informática no Cefet-MG). O objetivo era criar uma aplicação web, como um jogo ou um sistema de enquetes.

## Modo de jogo

* Tabuleiro 8x8, com 12 peças;
* Jogador X Jogador;
* Chegando ao lado oposto, a peça se torna uma 'dama';
    - A dama pode se mover uma peça por vez para todas as direções.
* A captura **não** é obrigatória;
* O jogo acaba quando todas as peças de um dos jogadores for capturada ou se o jogador 'abandonar';

## Implementações

* Uso de _webStorage_ para armazenar o nome dos jogadores;
* Distribuição das peças dinamicamente (via _JavaScript_);
* Painel de informações com 'Turno', 'Quantidade de peças capturadas' e 'Movimentos';
* Botão 'abandonar', que termina o jogo;
    - 'Abandonar' só pode ser ativado no turno do jogador; <img src = 'img/abandonar.png' width = '40px'>
* Janela 'sobre', que traz informações sobre os autores;
* Janela 'configurações', que permite mudar a cor do tabuleiro;
 <img src='img/screenshots/aba_config.png' height = '500px'>
    - Implementado com o uso do elemento 'selection' (poderia ser utilizado 'color').
    
    
* Highlights das jogadas possíveis para todas as peças;
* Tamanho do tabuleiro e quantidade de peças dinâmicos.

### Implementações Extras

1. Usar flexbox e grid para o layout
    - Toda o layout da página foi feita utilizando `flexbox`;
    - O tabuleiro foi criado usando `grid`:
    ```
        #tabuleiro {
            display: grid;
            grid-template-columns: repeat(8, 50px);
            grid-template-rows: repeat(8,50px);
        }
    ```

2. Usar media queries (CSS) para tornar as páginas "responsivas" (adaptáveis a diferentes telas - todas as páginas têm que ficar boas em telas grandes, médias e pequenas - pelo menos 320px de largura)
    - A página possui `media queries` que permitem com que ela seja vista perfeitamente em telefones (no mínimo 350px) e tablets (até 850px).
    <img src='img/screenshots/tela_celular.png' height = '500px'>

9. Usar o Git com o Github (ou outro serviço de hospedagem de repositórios) fazendo vários commits (por todos alunos pelo menos 1 por semana)
    - Durante toda a execução do projeto, foi utilizado a combinação Git-Github para manter um backup e registrar mudanças na página.
    ![Página que mostra os commits dos dias 25/11 e 26/11](img/screenshots/commits_git.png)

4. *Arte da página
    - A arte da pagina (peças e logo) foi toda elaborada e criada pelo grupo.

## To-do
* Adicionar empate caso haja repetição de movimentos (ou seja impossível concluir o jogo);
* Adicionar métodos para capturar peças em cadeia (por meio de recursividade?);
* Adicionar novas possibilidades de estilo de peça;
* Adicionar novos modos de jogo:
    - Rainha com movimentos amplos;
    - Captura obrigatória;
    - Damas com tabuleiro 10x10;
    - Jogo contra o computador (utilizando _Python_ como _back-end_?);
    - Adicionar modo online:
        -> Adicionar cadastro (_php_ + _MySQL_?).
* Adicionar aba 'reportar erros' utilizando `AJAX`/`fetch`.
