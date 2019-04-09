class Raio {

    constructor(newX, newY) {
        this.origem = {
            x: newX,
            y: newY
        };
        this.tam = 50;
        this.angle = undefined;
        this.drawing = true;
        this.modoEdicao = undefined;
    }

    defineDir(pontoX, pontoY) {
        let dir = {
            x: pontoX - this.origem.x,
            y: pontoY - this.origem.y
        };
        this.angle = atan2(dir.y, dir.x);
    }

    mousePressed(){
        
        let dist = (mouseX - this.origem.x) * (mouseX - this.origem.x) + (mouseY - this.origem.y) * (mouseY - this.origem.y);
        dist = sqrt(dist);

        if(dist <= this.tam){
            if(dist <= 7){
                this.modoEdicao = 0; // Editando origem
            }
            else{
                this.modoEdicao = 1; // Editando angulo
            }
        }
    }

    mouseReleased(){
        this.modoEdicao = undefined;
    }

    editar(){
        if(this.modoEdicao === 0){
            this.origem.x = mouseX;
            this.origem.y = mouseY;
        }
        if(this.modoEdicao === 1){
            this.defineDir(mouseX, mouseY);
        }
    }

    drawVector(fim){

        push(); // Salva estilo anterior
        
        // Desenha linha da seta
        stroke(0);
        strokeWeight(2);
        line(0, 0, fim.x, fim.y);
        // Fim da linha da seta

        // Desenha triangulo na ponta
        strokeWeight(1);
        translate(fim.x, fim.y);
        rotate(this.angle+HALF_PI);
        let offset = this.tam*0.1;
        fill(0);
        triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2);
        // Fim do triangulo

        pop(); // Retorna ao estilo anterior
    }

    draw() {

        push(); // Salva estilo anterior
        // Desenha origem
        translate(this.origem.x, this.origem.y);
        fill(0, 0, 255);                            
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
        line(0,0,fim.x*width,fim.y*width);
        // Fim do desenho da linha infinita

        pop(); // Retorna ao estilo anterior  
    }
}