let poligonos = [];
let raios = [];
let pol;
let rai;
let drawing = false;
let modoDesenho = 0;

function setup() {
    createCanvas(1280, 720);
}

function defineModoDesenho(id) {

    if (id == 'rai') {
        pol.drawing = false;
        modoDesenho = 0;
        drawing = false;
    }

    if (id == 'pol') {
        rai.drawing = false;
        modoDesenho = 1;
        drawing = false;
    }
}


function mouseClicked() {

    // Encontra modo de desenho

    if (0 < mouseX && mouseX < width && 0 < mouseY && mouseY < height) {
        switch (modoDesenho) {
            case 0: //Raio
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

            case 1: // Poligono
                if (!drawing) {
                    pol = new Poligono(mouseX, mouseY);
                    poligonos.push(pol);
                    drawing = true;
                } else pol.adicionaVertice(mouseX, mouseY);
                break;
        }
    }
}

function doubleClicked() {
    drawing = false;
    pol.drawing = false;
}

function draw() {
    background(200);
    poligonos.forEach(pol => {
        pol.draw();
    });
    raios.forEach(rai => {
        rai.draw();
    });
}