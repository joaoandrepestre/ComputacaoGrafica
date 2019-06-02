class Arcball{

    // Constructor - initializes the arcballs local fields
    constructor(_pos, _radius){
        this.position = _pos;
        this.radius = _radius;

        let geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        let material = new THREE.MeshBasicMaterial({
            color: 0xaaaaaa,
            transparent: true,
            opacity: 0.3
        });

        this.mesh = new THREE.Mesh(geometry, material);

        // // Defines the arcballs initial position
        this.update();
    }

    // Adds the arcball to the scene
    addToScene(){
        scene.add(this.mesh);
    }

    // Removes the arcball from the scene
    removeFromScene(){
        scene.remove(this.mesh);
    }
    
    // Translates the cube according to transVector
    translate(transVector){
        this.position.x += transVector.x;
        this.position.y += transVector.y;
        this.position.z += transVector.z;
    }

    // Updates the arcballs position
    update(){
        this.mesh.position.x = this.position.x;
        this.mesh.position.y = this.position.y;
        this.mesh.position.z = this.position.z;
    }

}
