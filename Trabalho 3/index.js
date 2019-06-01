// Event handling 
document.addEventListener('dblclick', onDoubleClick, false);
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

// THREE js variables
let scene;
let camera;
let renderer;

// Project variables
let cubes = [];
let sceneArcball;
let showSceneArcball = false;

// Setup function - initializes project and THREE js variables
function setup() {
    // Creates scene with a white background
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Creates a camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Creates a renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Generate the cubes
    let pos = {x: -1, y: -1, z: -1};
    let rot = {x: 0, y: 0, z: 0};
    let size = {x: 1, y: 1, z: 1};
    cube1 = new Cube(pos, rot, size, 0x00ff00);
    cubes.push(cube1);

    pos = {x: 1, y: 1, z: 1};
    rot = {x: 0, y: 0, z: 0};
    size = {x: 1, y: 1, z: 1};
    cube2 = new Cube(pos, rot, size, 0xff0000);
    cubes.push(cube2);

    // Creates the global arcball to rotate the scene
    sceneArcball = new Arcball(centroid(), 3*cubes[0].arcball.radius);
}

function centroid(){
    let centroid = {x: 0, y: 0, z: 0};
    let n = cubes.length;
    
    cubes.forEach(cube=>{
        centroid.x += cube.position.x;
        centroid.y += cube.position.y;
        centroid.z += cube.position.z;
    });


    centroid.x /= n;
    centroid.y /= n;
    centroid.z /= n;

    return centroid;
}

function radius(){

}

function onDoubleClick(event){
    let tmp = false;

    event.preventDefault();
        
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y =   - ( event.clientY / window.innerHeight ) * 2 + 1;

    tmp = cubes.some(cube=>{
        return cube.onDoubleClick(event);
    });

    if(!tmp){
        showSceneArcball = !showSceneArcball;
    }
}

function updateScene(){
    cubes[0].rotate({x: 0.01, y: 0, z: 0});
    cubes[1].rotate({x: -0.01, y: 0, z: 0});
    cubes.forEach(cube=>{
        cube.update();
    });

    if(showSceneArcball) sceneArcball.addToScene();
    else sceneArcball.removeFromScene();
}

function animate() {
    requestAnimationFrame(animate);
    updateScene();
    renderer.render(scene, camera);
}

setup();

camera.position.z = 5;

animate();