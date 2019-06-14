// Event handling
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('dblclick', onDoubleClick, false);
document.addEventListener('wheel', onWheel, false);
document.addEventListener('mousemove', onMouseMove, false);
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let mouseDown = false;

// THREE js variables
let scene;
let camera;
let aspect;
let frustumSize;
let renderer;

// Project variables
let cubes = [];
let selectedCube = undefined;
let sceneArcball;
let transformation_mode = 0; // 0 - translation; 1 - rotation
let sceneCenter;
let sceneRadius;


// Setup function - initializes project and THREE js variables
function setup() {
    // Creates scene with a white background
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfafafa);

    // Creates a camera
    frustumSize = 1000;
    aspect = window.innerWidth / window.innerHeight
    camera = new THREE.PerspectiveCamera(70, aspect, 1, 1000);
    //camera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 1, frustumSize);

    // Creates a renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = true;
    document.body.appendChild(renderer.domElement);

    let light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    // Generate the cubes
    let pos;
    let rot;
    let size;
    for (let i = 0; i < 10; i++) {
        pos = new THREE.Vector3(
            -5 + 10 * Math.random(),
            -5 + 10 * Math.random(),
            -5 + 10 * Math.random()
        );
        rot = new THREE.Vector3(
            -5 + 10 * Math.random(),
            -5 + 10 * Math.random(),
            -5 + 10 * Math.random()
        );
        size = new THREE.Vector3(
            1 + 2 * Math.random(),
            1 + 2 * Math.random(),
            1 + 2 * Math.random()
        );
        cubes.push(new Cube(pos, rot, size));
    }
    // Creates the global arcball to rotate the scene
    sceneCenter = centroid();
    sceneRadius = radius();
    sceneArcball = new Arcball(sceneCenter, sceneRadius);

    camera.position.x = sceneCenter.x;
    camera.position.y = sceneCenter.y;
    camera.position.z = sceneCenter.z + 1.1 * sceneRadius;
}

// Calculate the center os the scene 
function centroid() {
    let centroid = new THREE.Vector3(0, 0, 0);
    let n = cubes.length;

    cubes.forEach(cube => {
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
function radius() {
    let maxDistance = 0;
    let maxIndex = 0;
    let d;

    cubes.forEach((cube, i) => {
        d = distance(cube);
        if (maxDistance < d) {
            maxDistance = d;
            maxIndex = i;
        }
    });

    maxDistance += cubes[maxIndex].diagonal() / 2;

    return 1.1 * maxDistance;
}

// Calculate the distance of the cube to the center of the scene
function distance(cube) {
    return cube.position.distanceTo(sceneCenter);
}

// Handles mouse click - selects the clicked cube
function onMouseDown(event) {
    event.preventDefault();

    let intersects;
    let interIndex = 0;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        if (intersects[interIndex].object === sceneArcball.mesh) interIndex = 1;
        if (intersects[interIndex]) {
            cubes.some(cube => {
                if (intersects[interIndex].object === cube.mesh) {
                    selectedCube = cube;
                    selectedCube.mouseProjection = intersects[interIndex].point;
                    return true;
                }
                return false;
            });
        }
    } else selectedCube = undefined;
}

// Handles mouse double click - toggles tranformation mode between translation and rotation
function onDoubleClick(event) {
    event.preventDefault();
    transformation_mode = !transformation_mode;
}

// Handles mouse wheel scroll - zooms in and out of the scene
function onWheel(event) {
    event.preventDefault();

    if (event.deltaY < 0) camera.position.z -= 1;
    else if (event.deltaY > 0) camera.position.z += 1;
}

function onMouseMove(event) {
    event.preventDefault();
    let currentMouse = new THREE.Vector2((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    let intersects;
    let currentMouseProjection;

    if (selectedCube) {
        if (event.buttons == 1) {
            transformation_mode = 0;
            raycaster.setFromCamera(currentMouse, camera);
            intersects = raycaster.intersectObject(selectedCube.mesh);
            currentMouseProjection = undefined;
            if (intersects.length > 0) currentMouseProjection = intersects[0].point;

            selectedCube.position.x = selectedCube.mouseProjection.x;
            selectedCube.position.y = selectedCube.mouseProjection.y;
        }
        if (event.buttons == 2) {
            transformation_mode = 1;
        }

        if (currentMouseProjection != undefined) selectedCube.mouseProjection = currentMouseProjection;
    }

    mouse = currentMouse;
    transformation_mode = 0;
}

// Updates the scene
function updateScene() {

    cubes.forEach(cube => {
        cube.update();
    });

    sceneCenter = centroid();
    sceneRadius = radius();
    //console.log(sceneRadius);
    /* scene.position.x = sceneCenter.x;
    scene.position.y = sceneCenter.y;
    scene.position.z = sceneCenter.z; */


    sceneArcball.position = sceneCenter;
    sceneArcball.radius = sceneRadius;
    sceneArcball.update();
    if (selectedCube === undefined && transformation_mode == 1) sceneArcball.addToScene();
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