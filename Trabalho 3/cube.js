class Cube {

    constructor(_pos, _rot, _size, _color) {
        this.position = _pos;
        this.rotation = _rot;
        this.size = _size;
        this.color = _color;

        let arc_radius = 1.1*this.diagonal()/2;

        this.arcball = new Arcball(this.position, arc_radius);

        let geometry = new THREE.BoxGeometry(this.size.x, this.size.y, this.size.z);
        let material = new THREE.MeshBasicMaterial({
            color: this.color,
        });

        this.mesh = new THREE.Mesh(geometry, material);
    }

    diagonal(){
        return Math.sqrt(this.size.x*this.size.x + this.size.y*this.size.y + this.size.z*this.size.z);
    }

    addToScene(scene) {
        scene.add(this.mesh);
        this.arcball.addToScene(scene);
    }

    translate(transVector){
        this.position.x += transVector.x;
        this.position.y += transVector.y;
        this.position.z += transVector.z;
    }

    rotate(rotVector) {
        this.rotation.x += rotVector.x;
        this.rotation.y += rotVector.y;
        this.rotation.z += rotVector.z;
    }

    update(){
        this.mesh.position.x = this.position.x;
        this.mesh.position.y = this.position.y;
        this.mesh.position.z = this.position.z;

        this.mesh.rotation.x = this.rotation.x;
        this.mesh.rotation.y = this.rotation.y;
        this.mesh.rotation.z = this.rotation.z;
    }

}