# ComputacaoGrafica

## Como utilizar:
1. Abrir arquivo index.html em um navegador
2. Interagir com a interface definida

## Criação de objetos:
1. Selecionar modo criação
2. Selecionar forma a desenhar
* Polígono
1. Um clique do mouse dentro do canvas cria um novo polígono ou um novo vértice para o polígono sendo criado
2. Dois cliques do mouse finalizam o polígono sendo criado
* Raio
1. O primeiro clique do mouse cria um novo raio com a origem na posição do mouse
2. Após o primeiro clique, a direção do raio seguirá a posição do mouse
3. O segundo clique do mouse finaliza o raio sendo criado

## Edição de objetos:
1. Selecionar o modo edição
* Polígono
1. Segurar o botão do mouse posicionado sobre um dos pontos azuis nos vértices do polígono seleciona esse vértice
2. Segurar o botão do mouse posisionado dentro da área do polígono seleciona o polígono como um todo
3. Arrastar o mouse com um dos itens acima selecionados move o ítem segundo o movimento do mouse
4. Soltar o mouse finaliza a edição
* Raio
1. Segurar o botão do mouse posicionado sobre o ponto azul na origem do raio seleciona a origem para edição
2. Arrastar o mouse com a origem selecionada move a origem segundo o movimento do mouse
3. Soltar o mouse finaliza a edição
4. Segurar o botão do mouse posicionado dentro da circunferência definida pela origem do raio e pela ponta da seta seleciona a direção do raio para edição
5. Arrastar o mouse com a direção selecionada redefine a direção para seguir a posição do mouse
6. Soltar o mouse finaliza a edição

## Interseções
1. Selecionando "mostrar interseções" o programa mostra as interseções no canvas
* Interseções azuis denotam que o raio está entrando no polígono
* Interseções vermelhas denotam que o raio está saindo do polígono
