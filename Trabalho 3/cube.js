class Cube {

    constructor(_pos, _rot, _size, _color) {
        this.position = _pos;
        this.rotation = _rot;
        this.size = _size;
        this.color = _color;

        let arc_radius = 1.1*this.diagonal()/2;

        this.arcball = new Arcball(this.position, arc_radius);
        this.showArcball = false;

        let geometry = new THREE.BoxGeometry(this.size.x, this.size.y, this.size.z);
        let material = new THREE.MeshBasicMaterial({
            color: this.color,
        });

        this.mesh = new THREE.Mesh(geometry, material);

        this.update();
        this.addToScene();
    }

    diagonal(){
        return Math.sqrt(this.size.x*this.size.x + this.size.y*this.size.y + this.size.z*this.size.z);
    }

    addToScene() {
        scene.add(this.mesh);
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

        if(this.showArcball) this.arcball.addToScene();
        else this.arcball.removeFromScene();
    }

    onDoubleClick(){

        raycaster.setFromCamera(mouse, camera);
        let intersects = raycaster.intersectObject(this.mesh);

        if(intersects.length > 0){
            this.showArcball = !this.showArcball;
            if(selectedCube===this) selectedCube = undefined;
            else selectedCube = this;
            showSceneArcball = false;
            return true;
        }

        this.showArcball = false;

        return false;
    }

}