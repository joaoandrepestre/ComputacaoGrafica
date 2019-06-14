class Group {

    constructor(numberOfCubes) {

        this.position = new THREE.Vector3();
        this.radius = 0;
        this.cubes = [];

        let pos = new THREE.Vector3();
        let rot  = new THREE.Euler();
        let size = new THREE.Vector3(1,1,1);
        for (let i = 0; i < numberOfCubes; i++) {
            pos = new THREE.Vector3(
                -5 + 10 * Math.random(),
                -5 + 10 * Math.random(),
                -5 + 10 * Math.random()
            );
            rot = new THREE.Euler(
                0 + 2 * Math.PI * Math.random(),
                0 + 2 * Math.PI * Math.random(),
                0 + 2 * Math.PI * Math.random(),
                'XYZ'
            );
            size = new THREE.Vector3(
                1 + 2 * Math.random(),
                1 + 2 * Math.random(),
                1 + 2 * Math.random()
            );
            this.cubes.push(new Cube(pos, rot, size));
        }
        this.findCentroid();
        this.findRadius();
        this.arcball = new Arcball(this.position, this.radius);
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

    update() {

        this.cubes.forEach(cube => {
            cube.update();
        });

        this.arcball.position = this.findCentroid();
        this.arcball.radius = this.findRadius();

        this.arcball.update();
        if (selected === this && transformation_mode == 1) this.arcball.addToScene();
        else this.arcball.removeFromScene();
    }
}