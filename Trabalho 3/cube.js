class Cube {

    // Constructor - initializes the cubes local fields
    constructor(_pos, _rot, _size) {
        this.position = _pos;
        this.rotation = _rot;
        this.size = _size;

        let arc_radius = 1.1 * this.diagonal() / 2;

        this.arcball = new Arcball(this.position, arc_radius);

        let geometry = new THREE.BoxGeometry(this.size.x, this.size.y, this.size.z);

        // Sets different colors to each face of the cube
        geometry.faces[0].color = new THREE.Color(0xd6a5ab);
        geometry.faces[1].color = new THREE.Color(0xd6a5ab);

        geometry.faces[2].color = new THREE.Color(0x8eaac7);
        geometry.faces[3].color = new THREE.Color(0x8eaac7);

        geometry.faces[4].color = new THREE.Color(0xafcfbf);
        geometry.faces[5].color = new THREE.Color(0xafcfbf);

        geometry.faces[6].color = new THREE.Color(0xb9016e);
        geometry.faces[7].color = new THREE.Color(0xb9016e);

        geometry.faces[8].color = new THREE.Color(0x32567a);
        geometry.faces[9].color = new THREE.Color(0x32567a);

        geometry.faces[10].color = new THREE.Color(0xecf470);
        geometry.faces[11].color = new THREE.Color(0xecf470);
        let material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            flatShading: true,
            vertexColors: THREE.VertexColors
        });

        this.mesh = new THREE.Mesh(geometry, material);

        // Defines the cubes initial position and rotation
        this.update();

        // Adds it to the scene
        this.addToScene();
    }

    // Calculate the diagonal of the cube
    diagonal() {
        return Math.sqrt(this.size.x * this.size.x + this.size.y * this.size.y + this.size.z * this.size.z);
    }

    // Adds the cube to the scene
    addToScene() {
        scene.add(this.mesh);
    }

    // Translates the cube according to transVector
    translate(transVector) {
        this.position.x += transVector.x;
        this.position.y += transVector.y;
        this.position.z += transVector.z;

        this.arcball.translate(transVector);
    }

    // Rotate the cube according to rotVector
    rotate(rotVector) {
        this.rotation.x += rotVector.x;
        this.rotation.y += rotVector.y;
        this.rotation.z += rotVector.z;
    }

    // Updates the cubes position and rotation
    update() {
        this.mesh.position.x = this.position.x;
        this.mesh.position.y = this.position.y;
        this.mesh.position.z = this.position.z;

        this.mesh.rotation.x = this.rotation.x;
        this.mesh.rotation.y = this.rotation.y;
        this.mesh.rotation.z = this.rotation.z;

        this.arcball.update();

        if (selectedCube === this && transformation_mode == 1) this.arcball.addToScene();
        else this.arcball.removeFromScene();
    }
}