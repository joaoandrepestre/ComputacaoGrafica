class Group {

    // Constructor - initializes the groups local fields
    constructor(numberOfCubes) {

        this.object = new THREE.Object3D();

        this.position = new THREE.Vector3();
        this.radius = 0;
        this.cubes = [];

        // Creates random cubes
        let pos = new THREE.Vector3();
        let q = new THREE.Quaternion();
        let size = new THREE.Vector3(1, 1, 1);
        for (let i = 0; i < numberOfCubes; i++) {
            pos = new THREE.Vector3(
                -5 + 10 * Math.random(),
                -5 + 10 * Math.random(),
                -5 + 10 * Math.random()
            );
            q = new THREE.Quaternion(
                -5 + 10 * Math.random(),
                -5 + 10 * Math.random(),
                -5 + 10 * Math.random(),
                -5 + 10 * Math.random()
            ).normalize();
            size = new THREE.Vector3(
                1 + 2 * Math.random(),
                1 + 2 * Math.random(),
                1 + 2 * Math.random()
            );
            let c = new Cube(pos, q, size);
            this.cubes.push(c);
        }
        this.findCentroid();
        this.findRadius();
        this.arcball = new Arcball(this.position, this.radius);

        this.addToScene();
    }

    // Adds itself and its children to the scene
    addToScene() {
        this.cubes.forEach(cube => {
            this.object.add(cube.mesh);
            this.object.add(cube.arcball.mesh);
        });
        scene.add(this.object);
    }

    // Calculate the center os the scene 
    findCentroid() {
        this.position = new THREE.Vector3();
        let n = this.cubes.length;

        this.cubes.forEach(cube => {
            this.position.x += cube.position.x;
            this.position.y += cube.position.y;
            this.position.z += cube.position.z;
        });

        this.position.x /= n;
        this.position.y /= n;
        this.position.z /= n;

        return this.position;
    }

    // Calculate the radius of the scene
    findRadius() {
        this.radius = 0;
        let furthestCube;
        let d;

        this.cubes.forEach(cube => {
            d = this.distance(cube);
            if (this.radius <= d) {
                this.radius = d;
                furthestCube = cube;
            }
        });

        this.radius += furthestCube.diagonal() / 2;

        this.radius = 1.1 * this.radius;

        return this.radius
    }

    // Calculate the distance of the cube to the center of the scene
    distance(cube) {
        return cube.position.distanceTo(this.position);
    }

    // Calculatesthe translation vector
    handleTranslation(currentMouse) {
        let move = currentMouse.clone().sub(mouse).multiplyScalar(0.4 * mouse.distanceTo(camera.position));
        move = this.object.worldToLocal(move);
        selected.translate(move);
    }

    // Calculates the quaternion for rotation
    handleRotation(currentMouse) {
        let va = this.arcball.getArcballVector(mouse.clone());
        let vb = this.arcball.getArcballVector(currentMouse.clone());

        let q = new THREE.Quaternion();
        let axis = new THREE.Vector3().crossVectors(va, vb).normalize().multiplyScalar(this.radius);
        let angle = Math.acos(Math.min(1.0, va.dot(vb)));
        q.setFromAxisAngle(axis, angle);
        q.normalize();
        this.rotate(q);
    }

    // Rotates the group of objects
    rotate(quaternion) {
        this.object.quaternion.multiplyQuaternions(this.object.quaternion, quaternion).normalize();
    }

    // Updates itself and its children
    update() {

        this.cubes.forEach(cube => {
            cube.update();
        });

        this.arcball.position = this.findCentroid();
        this.arcball.radius = this.findRadius();

        this.arcball.update();
        if (selected === this && transformation_mode == 1) this.object.add(this.arcball.mesh);
        else this.object.remove(this.arcball.mesh);

    }
}