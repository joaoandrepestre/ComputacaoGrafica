// Constants
const TRANSLATION = 0;
const ROTATION = 1;
const fov = 70;
const aspect = window.innerWidth / window.innerHeight;
const near = 1;
const far = 1000;


// Event handling
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('dblclick', onDoubleClick, false);
document.addEventListener('wheel', onWheel, false);
document.addEventListener('mousemove', onMouseMove, false);
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

// THREE js variables
let scene;
let camera;
let renderer;

// Project variables
let group;
let selected;
let transformation_mode = TRANSLATION; // 0 - translation; 1 - rotation



// Setup function - initializes project and THREE js variables
function setup() {
    // Creates scene with a white background
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfafafa);

    // Creates a camera
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
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

    group = new Group(10);
    selected = group;

    camera.position = group.position;
    camera.position.z += 1.1 * group.radius;
}

// Handles mouse click - selects the clicked cube
function onMouseDown(event) {
    event.preventDefault();

    let intersects;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(group.object.children);

    if (intersects.length > 0) {
        if (intersects[0].object === group.arcball.mesh) {
            selected = group;
            selected.arcball.mouseProjection = intersects[0].point;
        }
        if (intersects[1]) {
            group.cubes.some(cube => {
                if (intersects[1].object === cube.mesh) {
                    selected = cube;
                    selected.mouseProjection = intersects[1].point;
                    return true;
                } else if (intersects[1].object === cube.arcball.mesh) {
                    selected = cube;
                    selected.arcball.mouseProjection = intersects[1].point;
                }
                return false;
            });
        }
    } else selected = group;
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

function onMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    let intersects;
    let currentMouseProjection;


    if (event.buttons == 1) {
        switch (transformation_mode) {
            case TRANSLATION:
                if (selected !== group) {
                    intersects = raycaster.intersectObject(selected.mesh);
                    if (intersects.length > 0) selected.mouseProjection = intersects[0].point;

                    selected.position.x = selected.mouseProjection.x;
                    selected.position.y = selected.mouseProjection.y;
                }
                break;
            case ROTATION:
                intersects = raycaster.intersectObject(selected.arcball.mesh);
                if (intersects.length > 0) currentMouseProjection = intersects[0].point;
                let q = new THREE.Quaternion();
                let v = selected.arcball.mouseProjection.clone().cross(currentMouseProjection);
                q.x = v.x;
                q.y = v.y;
                q.z = v.z;
                q.w = selected.arcball.mouseProjection.dot(currentMouseProjection);
                q.normalize();
                if (selected !== group) {
                    selected.rotate(q);
                } else {
                    selected.rotate(q);
                }
                selected.arcball.mouseProjection = currentMouseProjection;
                break;
        }
    }

}

// Animate function - called every frame of the animation
function animate() {
    requestAnimationFrame(animate);
    group.update()
    renderer.render(scene, camera);
}

setup();

animate();