class Poligono {

    // Cria novo objeto polígono
    constructor(newX, newY) {
        this.vertices = [];
        this.adicionaVertice(newX, newY);
        this.drawing = true;
        this.pontoSelect = undefined;
        this.arrastar = false;
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

        // Selecionar o polígono inteiro
        let raio = new Raio(mouseX, mouseY);
        raio.defineDir(0,0);
        raio.calculaInter([this]);
        if(raio.intersects[0].length % 2 != 0){
            this.arrastar = true;
        }

        // Selecionar vertices específicos
        this.vertices.forEach(ponto => {
            let dist = (mouseX - ponto.x) * (mouseX - ponto.x) + (mouseY - ponto.y) * (mouseY - ponto.y);
            dist = sqrt(dist);
            if (dist <= 5) {
                this.pontoSelect = ponto;
                this.arrastar = false;
            }
        });

        return (this.pontoSelect != undefined || this.arrastar)
    }

    // Lida com o mouse liberado com relação ao polígono
    mouseReleased(){
        this.pontoSelect = undefined;
        this.arrastar = false;
    }

    // Move o ponto selecionado para a posição atual do mouse
    editar() {

        if(this.pontoSelect){
            this.pontoSelect.x = mouseX;
            this.pontoSelect.y = mouseY;
        }

        if(this.arrastar){
            const movimento = {
                x: mouseX - pmouseX,
                y: mouseY - pmouseY
            };
            this.vertices.forEach(ponto =>{
                ponto.x += movimento.x;
                ponto.y += movimento.y;
            });
        }
    }

    // Desenha o polígono no canvas
    draw(editando) {

        push(); // Salva estilo anterior

        fill(152, 251, 152, 50);
        if(editando && this.arrastar) fill(152, 251, 152, 100);
        beginShape();
        this.vertices.forEach(ponto => {
            if (editando) {
                push();
                fill(0,0,255);
                if(this.pontoSelect && ponto.x == this.pontoSelect.x && ponto.y == this.pontoSelect.y) fill(255,0,0);
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