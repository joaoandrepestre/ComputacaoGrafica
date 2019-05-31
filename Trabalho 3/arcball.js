class Arcball{

    constructor(_pos, _radius){
        this.position = _pos;
        this.radius = _radius;

        let geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        let material = new THREE.MeshBasicMaterial({
            color: 0x888888,
            transparent: true,
            opacity: 0.6
        });

        this.mesh = new THREE.Mesh(geometry, material);
    }

    addToScene(scene){
        scene.add(this.mesh);
    }

    removeFromScene(scene){
        scene.remove(this.mesh);
    }

    translate(transVector){
        this.position.x += transVector.x;
        this.position.y += transVector.y;
        this.position.z += transVector.z;
    }

    update(){
        this.mesh.position.x = this.position.x;
        this.mesh.position.y = this.position.y;
        this.mesh.position.z = this.position.z;
    }

}
