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
let selectedCube = undefined;
let sceneArcball;
let showSceneArcball = false;
let sceneCenter;
let sceneRadius;

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
    let pos = {x: -2, y: -2, z: -2};
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
    sceneCenter = centroid();
    sceneRadius = radius();
    sceneArcball = new Arcball(sceneCenter, sceneRadius);

    camera.position.z = 5;
}

// Calculate the center os the scene 
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

// Calculate the radius of the scene
function radius(){
    let maxDistance = 0;
    let maxIndex;
    let d;

    cubes.forEach((cube, i)=>{
        d = distance(cube);
        if(maxDistance < d){
            maxDistance = d;
            maxIndex = i;
        }
    });

    maxDistance += cubes[maxIndex].diagonal()/2; 

    return 1.1*maxDistance;
}

// Calculate the distance of the cube to the center of the scene
function distance(cube){
    let d = (cube.position.x - sceneCenter.x)*(cube.position.x - sceneCenter.x);
    d += (cube.position.y - sceneCenter.y)*(cube.position.y - sceneCenter.y);
    d += (cube.position.z - sceneCenter.z)*(cube.position.z - sceneCenter.z);

    return Math.sqrt(d);
}


// Handles mouse double click
function onDoubleClick(event){
    let tmp = false;

    event.preventDefault();
        
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y =   - ( event.clientY / window.innerHeight ) * 2 + 1;

    cubes.forEach(cube=>{
        if(cube.onDoubleClick()) tmp = true;
    });

    if(!tmp){
        selectedCube = undefined;
        showSceneArcball = !showSceneArcball;
    }
}


// Updates the scene
function updateScene(){
    cubes[0].rotate({x: 0.01, y: 0, z: 0});
    cubes[1].rotate({x: -0.01, y: 0, z: 0});
    
    cubes.forEach(cube=>{
        cube.update();
    });

    sceneCenter = centroid();
    sceneRadius = radius();
    sceneArcball.position = sceneCenter;
    sceneArcball.radius = sceneRadius;
    if(showSceneArcball) sceneArcball.addToScene();
    else sceneArcball.removeFromScene();

}


// Animate function - called every frame of the animation
function animate() {
    requestAnimationFrame(animate);
    updateScene();
    renderer.render(scene, camera);
}

setup();

animate();