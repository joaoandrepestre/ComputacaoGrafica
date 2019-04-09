class Poligono {

    // Cria novo objeto polígono
    constructor(newX, newY) {
        this.vertices = [];
        this.adicionaVertice(newX, newY);
        this.drawing = true;
        this.pontoSelect = undefined;
    }

    // Adiciona um novo vértice ao polígono
    adicionaVertice(newX, newY) {
        const ponto = {
            x: newX,
            y: newY
        };
        this.vertices.push(ponto);
    }

    // Lida com o mouse pressionado com relação ao polígono
    mousePressed() {
        this.vertices.forEach(ponto => {
            let dist = (mouseX - ponto.x) * (mouseX - ponto.x) + (mouseY - ponto.y) * (mouseY - ponto.y);
            dist = sqrt(dist);
            if (dist <= 5) {
                this.pontoSelect = ponto;
            }
        });
    }

    // Lida com o mouse liberado com relação ao polígono
    mouseReleased(){
        this.pontoSelect = undefined;
    }

    // Move o ponto selecionado para a posição atual do mouse
    editar() {

        if(this.pontoSelect){
            this.pontoSelect.x = mouseX;
            this.pontoSelect.y = mouseY;
        }
    }

    // Desenha o polígono no canvas
    draw(editando) {

        push(); // Salva estilo anterior

        fill(152, 251, 152, 50);
        beginShape();
        this.vertices.forEach(ponto => {
            if (editando) {
                push();
                fill(0);
                if(this.pontoSelect && ponto.x == this.pontoSelect.x && ponto.y == this.pontoSelect.y) fill(0,0,255);
                ellipse(ponto.x, ponto.y, 5);
                pop();
            }
            vertex(ponto.x, ponto.y);
        });
        if (this.drawing) vertex(mouseX, mouseY);
        endShape(CLOSE);

        pop(); // Retorna ao estilo anterior
    }
}