class Raio {

    // Cria um novo objeto raio
    constructor(newX, newY) {
        this.origem = {
            x: newX,
            y: newY
        };
        this.tam = 50;
        this.angle = undefined;
        this.drawing = true;
        this.modoEdicao = undefined;
        this.intersects = [];
    }

    // Define direção em que o raio está apontado
    defineDir(pontoX, pontoY) {
        let dir = {
            x: pontoX - this.origem.x,
            y: pontoY - this.origem.y
        };
        this.angle = atan2(dir.y, dir.x);
    }

    // Lida com o mouse pressionado com relação ao raio
    mousePressed() {

        let dist = (mouseX - this.origem.x) * (mouseX - this.origem.x) + (mouseY - this.origem.y) * (mouseY - this.origem.y);
        dist = sqrt(dist);

        if (dist <= this.tam) {
            if (dist <= 7) {
                this.modoEdicao = 0; // Editando origem
            } else {
                this.modoEdicao = 1; // Editando angulo
            }
        }
    }

    // Lida com o mouse liberado com relação ao raio
    mouseReleased() {
        this.modoEdicao = undefined;
    }

    // Encontra pontos de interseção do raio com os polígonos
    calculaInter(poligonos) {

        this.intersects = [];

        let linha = {
            a: tan(this.angle),
            b: this.origem.y - this.origem.x * tan(this.angle)
        };


        poligonos.forEach(pol => {
            pol.vertices.forEach((ponto, i) => {
                if (i < pol.vertices.length-1) {
                    let pontoProx = pol.vertices[i + 1];
                    let ang = (pontoProx.y - ponto.y) / (pontoProx.x - ponto.x);
                    let aresta = {
                        a: ang,
                        b: ponto.y - ponto.x * ang
                    };
                    let inter = {
                        x: (aresta.b - linha.b) / (linha.a - aresta.a),
                    };
                    inter.y = linha.a * inter.x + linha.b;
                    this.intersects.push(inter);
                }
            });
        });
    }

    // Modifica a posição da origem ou a direção do raio
    editar() {
        if (this.modoEdicao === 0) {
            this.origem.x = mouseX;
            this.origem.y = mouseY;
        }
        if (this.modoEdicao === 1) {
            this.defineDir(mouseX, mouseY);
        }
    }

    // Desenha uma seta na direção do raio
    drawVector(fim) {

        push(); // Salva estilo anterior

        // Desenha linha da seta
        stroke(0);
        strokeWeight(2);
        line(0, 0, fim.x, fim.y);
        // Fim da linha da seta

        // Desenha triangulo na ponta
        strokeWeight(1);
        translate(fim.x, fim.y);
        rotate(this.angle + HALF_PI);
        let offset = this.tam * 0.1;
        fill(0);
        triangle(-offset * 0.5, offset, offset * 0.5, offset, 0, -offset / 2);
        // Fim do triangulo

        pop(); // Retorna ao estilo anterior
    }

    // Desenha o raio no canvas
    draw(editando, inter) {

        push(); // Salva estilo anterior
        // Desenha origem
        translate(this.origem.x, this.origem.y);
        fill(0, 0, 255);
        if (editando && this.modoEdicao === 0) fill(255, 0, 0);
        noStroke();
        ellipse(0, 0, 7, 7);
        // Fim do desenho da origem

        // Define ponto de fim do raio
        if (this.drawing) {
            this.defineDir(mouseX, mouseY);
        }
        let fim = {
            x: this.tam * cos(this.angle),
            y: this.tam * sin(this.angle)
        };
        // Fim da definição de fim

        this.drawVector(fim); // Desenha a seta do raio

        // Desenha linha infinita na direção do raio
        stroke(50);
        line(0, 0, fim.x * width, fim.y * width);
        // Fim do desenho da linha infinita

        if (inter) {
            push();
            console.log(this.intersects);
            this.intersects.forEach(ponto => {
                strokeWeight(5);
                point(ponto.x, ponto.y);
            });
            pop();
        }

        pop(); // Retorna ao estilo anterior  
    }
}