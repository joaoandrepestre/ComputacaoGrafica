class Poligono {

    constructor(newX, newY) {
        this.vertices = [];
        this.adicionaVertice(newX, newY);
        this.drawing = true;
    }

    adicionaVertice(newX, newY) {
        const ponto = {
            x: newX,
            y: newY
        };
        this.vertices.push(ponto);
    }

    draw() {

        push(); // Salva estilo anterior

        fill(152, 251, 152, 50);
        beginShape();
        this.vertices.forEach(ponto => {
            vertex(ponto.x, ponto.y);
        });
        if (this.drawing) vertex(mouseX, mouseY);
        endShape(CLOSE);
        
        pop(); // Retorna ao estilo anterior
    }
}