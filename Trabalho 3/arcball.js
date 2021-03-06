class Arcball {

    // Constructor - initializes the arcballs local fields
    constructor(_pos, _radius) {
        this.position = _pos;
        this.radius = _radius;

        let geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        let material = new THREE.MeshBasicMaterial({
            color: 0xaaaaaa,
            transparent: true,
            opacity: 0.3
        });

        this.mesh = new THREE.Mesh(geometry, material);

        this.mouseProjection = undefined;

        // Defines the arcballs initial position
        this.update();
    }

    // Returns the arcball vector for calculating the quaternion
    getArcballVector(point){
        //point.y = - point.y;

        let op2 = point.x*point.x + point.y*point.y;
        if(op2 <= 1){
            point.z = Math.sqrt(1- op2);
        }else{
            point.normalize();
        }
        return point;
    }

    // Translates the cube according to transVector
    translate(transVector) {/* 
        this.position.x += transVector.x;
        this.position.y += transVector.y;
        this.position.z += transVector.z; */
        this.position.add(transVector);
    }

    // Updates the arcballs position
    update() {
        this.mesh.position.copy(this.position);

        let scale = this.radius / this.mesh.geometry.parameters.radius;

        this.mesh.scale.x = scale;
        this.mesh.scale.y = scale;
        this.mesh.scale.z = scale;
    }

}