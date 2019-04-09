let poligonos = [];
let raios = [];
let pol;
let rai;
let drawing = false;
let modoDesenho = 0; // Polígono: 0 - Raio: 1
let modo = 0; // Criar: 0 - Editar: 1

function setup() {
    createCanvas(1280, 720);
}

function defineModo(id) {

    if (id == 'criar' && modo == 1) {
        document.getElementById('editar').checked = false;
        modo = 0;
    }

    if (id == 'editar' && modo == 0) {
        document.getElementById('criar').checked = false;
        modo = 1;
    }

}

function defineModoDesenho(id) {

    if (id == 'rai' && modoDesenho == 0) {
        document.getElementById('pol').checked = false;
        if (pol) {
            pol.drawing = false;
            pol = undefined;
        }
        modoDesenho = 1;
        drawing = false;
    }

    if (id == 'pol' && modoDesenho == 1) {
        document.getElementById('rai').checked = false;
        if (rai != undefined && rai.drawing) {
            raios.splice(raios.length - 1, 1);
            rai = undefined;
        }
        modoDesenho = 0;
        drawing = false;
    }
}


function mousePressed() {
    poligonos.forEach(pol => {
        pol.mousePressed();
    });
    raios.forEach(rai => {
        rai.mousePressed();
    });
}

function mouseReleased() {
    poligonos.forEach(pol => {
        pol.mouseReleased();
    });
    raios.forEach(rai => {
        rai.mouseReleased();
    });
}

function mouseClicked() {

    // Encontra modo de desenho

    if (0 < mouseX && mouseX < width && 0 < mouseY && mouseY < height && modo == 0) {
        switch (modoDesenho) {
            case 0: // Polígono
                if (!drawing) {
                    pol = new Poligono(mouseX, mouseY);
                    poligonos.push(pol);
                    drawing = true;
                } else pol.adicionaVertice(mouseX, mouseY);
                break;

            case 1: // Raio
                if (!drawing) {
                    rai = new Raio(mouseX, mouseY);
                    raios.push(rai);
                    drawing = true;
                } else {
                    rai.defineDir(mouseX, mouseY);
                    drawing = false;
                    rai.drawing = false;
                }
                break;
        }
    }
}

function doubleClicked() {
    if (modoDesenho == 0) {
        drawing = false;
        pol.drawing = false;
        pol.vertices.splice(pol.vertices.length - 1, 1);
    }
}

function draw() {
    background(200);
    poligonos.forEach(pol => {
        if (modo == 1) pol.editar();
        pol.draw(modo);
    });
    raios.forEach(rai => {
        if (modo == 1) rai.editar();
        rai.draw();
    });
}