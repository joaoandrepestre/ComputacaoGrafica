class Cube {

    // Constructor - initializes the cubes local fields
    constructor(_pos, _q, _size) {
        this.position = _pos;
        this.quaternion = _q;
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
        this.mesh.quaternion.copy(this.quaternion);
        //this.mesh.add(this.arcball.mesh);

        this.mouseProjection = undefined;

        // Defines the cubes initial position and rotation
        this.update();

    }

    // Calculate the diagonal of the cube
    diagonal() {
        return Math.sqrt(this.size.x * this.size.x + this.size.y * this.size.y + this.size.z * this.size.z);
    }

    // Translates the cube according to transVector
    translate(transVector) {
        this.position.add(transVector);/* 
        this.position.x += transVector.x;
        this.position.y += transVector.y;
        this.position.z += transVector.z; */

        this.arcball.translate(transVector);
    }

    // Rotate the cube according to rotVector
    rotate(quaternion) {
        this.mesh.quaternion.multiplyQuaternions(this.mesh.quaternion, quaternion).normalize();
    }

    // Updates the cubes position and rotation
    update() {
        this.mesh.position.copy(this.position);

        this.arcball.update();

        if (selected === this && transformation_mode == 1) this.arcball.mesh.material.opacity = 0.3;
        else this.arcball.mesh.material.opacity = 0;
    }
}