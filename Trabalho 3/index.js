// Constants
const TRANSLATION = 0;
const ROTATION = 1;
const fov = 70;
const aspect = window.innerWidth / window.innerHeight;
const near = 1;
const far = 1000;


// Event handling
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mouseup', onMouseUp, false);
document.addEventListener('dblclick', onDoubleClick, false);
document.addEventListener('wheel', onWheel, false);
document.addEventListener('mousemove', onMouseMove, false);
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector3();
let screenMouse = new THREE.Vector3();

// THREE js variables
let scene;
let camera;
let renderer;

// Project variables
let group;
let selected;
let transformation_mode = TRANSLATION;



// Setup function - initializes project and THREE js variables
function setup() {
    // Creates scene with a white background
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfafafa);

    // Creates a camera
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // Creates a renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = true;
    document.body.appendChild(renderer.domElement);

    // Creates a new group with 10 cubes
    group = new Group(10);
    selected = group;

    // Sets the camera position
    camera.position = group.position;
    camera.position.z += 2 * group.radius;
}

// Handles mouse down - selects the clicked object
function onMouseDown(event) {
    event.preventDefault();

    let intersects;
    interIndex = 0;

    screenMouse.x = event.clientX;
    screenMouse.y = event.clientY;
    screenMouse.z = 0;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 1;

    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(group.object.children);

    if (intersects.length > 0) {
        if (intersects[0].object === group.arcball.mesh) {
            selected = group;
            selected.arcball.mouseProjection = intersects[0].point;
            interIndex = 1;
        }
        if (intersects[interIndex]) {
            group.cubes.some(cube => {
                if (intersects[interIndex].object === cube.mesh) {
                    selected = cube;
                    selected.mouseProjection = intersects[interIndex].point;
                    return true;
                } else if (intersects[interIndex].object === cube.arcball.mesh) {
                    selected = cube;
                    selected.arcball.mouseProjection = intersects[interIndex].point;
                    return true;
                }
                return false;
            });
        }
    } else selected = group;
}

function onMouseUp(event) {
    event.preventDefault();
    group.object.position.copy(group.position);
    camera.position.copy(group.position);
    camera.position.z += 2 * group.radius;
}

// Handles mouse double click - toggles tranformation mode between translation and rotation
function onDoubleClick(event) {
    event.preventDefault();
    transformation_mode = transformation_mode == TRANSLATION ? ROTATION : TRANSLATION;
}

// Handles mouse wheel scroll - zooms in and out of the scene
function onWheel(event) {
    event.preventDefault();

    if (event.deltaY < 0) camera.position.z -= 1;
    else if (event.deltaY > 0) camera.position.z += 1;
}

// Handles mouse movement - translates or rotates the selected object
function onMouseMove(event) {
    event.preventDefault();

    let currentScreenMouse = new THREE.Vector3(event.clientX, event.clientY, 0);
    let currentMouse = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        1);

    //raycaster.setFromCamera(mouse, camera);

    //let intersects;
    //let currentMouseProjection = selected.mouseProjection;


    if (event.buttons == 1) {
        switch (transformation_mode) {
            case TRANSLATION:
                if (selected !== group) {
                    group.handleTranslation(currentScreenMouse);
                }
                break;
            case ROTATION:
                /* intersects = raycaster.intersectObject(selected.arcball.mesh);
                if (intersects.length > 0) currentMouseProjection = intersects[0].point; */

                selected.handleRotation(currentMouse);

                //selected.arcball.mouseProjection = currentMouseProjection;
                break;
        }
    }

    mouse = currentMouse;
    screenMouse = currentScreenMouse;
}

// Animate function - called every frame of the animation
function animate() {
    requestAnimationFrame(animate);
    group.update()
    renderer.render(scene, camera);
}

setup();

animate();