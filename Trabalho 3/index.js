let scene;
let camera;
let renderer;
let cube;
let arcball;

function setup() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let pos = {x: 0, y: 0, z: 0};
    let rot = {x: 0.5, y: 0.5, z: 0};
    let size = {x: 1, y: 1, z: 1};
    cube = new Cube(pos, rot, size, 0x00ff00);
    cube.addToScene(scene);


    arcball = new Arcball(cube.position, 3*cube.arcball.radius);
    arcball.addToScene(scene);
}

function animate() {
    requestAnimationFrame(animate);
    cube.rotate({x: 0.01, y: 0.01, z: 0});
    cube.update();
    renderer.render(scene, camera);
}

setup();

camera.position.z = 5;

animate();