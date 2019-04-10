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

    // Checa se pontoAtual está entre o ponto1 e o ponto2
    pontoEntrePontos(pontoAtual, ponto1, ponto2) {

        let linha = {
            x: ponto2.x - ponto1.x,
            y: ponto2.y - ponto1.y
        };

        if (abs(linha.x) >= abs(linha.y)) {
            return linha.x > 0 ?
                ponto1.x <= pontoAtual.x && pontoAtual.x <= ponto2.x :
                ponto2.x <= pontoAtual.x && pontoAtual.x <= ponto1.x;
        } else {
            return linha.y > 0 ?
                ponto1.y <= pontoAtual.y && pontoAtual.y <= ponto2.y :
                ponto2.y <= pontoAtual.y && pontoAtual.y <= ponto1.y;
        }

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
                let pontoProx;
                if (i < pol.vertices.length - 1) {
                    pontoProx = pol.vertices[i + 1];
                } else {
                    pontoProx = pol.vertices[0];
                }
                let aresta = {
                    a: (pontoProx.y - ponto.y) / (pontoProx.x - ponto.x),
                };
                aresta.b = ponto.y - ponto.x * aresta.a;
                let inter = {
                    x: (aresta.b - linha.b) / (linha.a - aresta.a),
                };
                inter.y = linha.a * inter.x + linha.b;

                let fim = {
                    x: this.origem.x + width*cos(this.angle),
                    y: this.origem.y + width*sin(this.angle)
                };

                if (this.pontoEntrePontos(inter, ponto, pontoProx) && this.pontoEntrePontos(inter, this.origem,fim)) {
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
        line(this.origem.x, this.origem.y, fim.x, fim.y);
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
    draw(editando, mostrar) {

        push(); // Salva estilo anterior
        // Desenha origem
        fill(0);
        if (editando) {
            fill(0, 0, 255);
            if (this.modoEdicao === 0) {
                fill(255, 0, 0);
            }
        }
        noStroke();
        ellipse(this.origem.x, this.origem.y, 7, 7);
        // Fim do desenho da origem

        // Define ponto de fim do raio
        if (this.drawing) {
            this.defineDir(mouseX, mouseY);
        }
        let dir = {
            x: this.tam * cos(this.angle),
            y: this.tam * sin(this.angle)
        };

        let fim = {
            x: this.origem.x + dir.x,
            y: this.origem.y + dir.y
        };
        // Fim da definição de fim

        this.drawVector(fim); // Desenha a seta do raio

        // Desenha linha infinita na direção do raio
        stroke(50);
        line(this.origem.x, this.origem.y, dir.x * width, dir.y * width);
        // Fim do desenho da linha infinita

        if (mostrar) {
            push();
            //console.log(this.intersects);
            this.intersects.forEach((ponto, i) => {
                strokeWeight(5);
                /* if(i%2) stroke(255,0,0);
                else stroke(0,0,255); */
                point(ponto.x, ponto.y);
            });
            pop();
        }

        pop(); // Retorna ao estilo anterior  
    }
}