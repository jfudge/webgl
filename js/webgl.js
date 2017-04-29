var PlanetScene = function() {

    // self-reference
    var self = this;

    this.WIDTH = window.innerWidth;
    this.HEIGHT = window.innerHeight;
    this.ASPECT_RATIO = this.WIDTH / this.HEIGHT;
    this.FOV = 45;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x000000, 0.0005);
    this.camera = new THREE.PerspectiveCamera(this.FOV,
        this.ASPECT_RATIO,
        1,
        1000);
    this.renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    this.renderer.setSize(this.WIDTH, this.HEIGHT);

    this.cubeMesh = null;

    // initializes the page
    this.init = function() {
        console.log('PlanetScene.init()');
        document.getElementById('load-message').style.display = 'none';
        document.body.appendChild(self.renderer.domElement);

        // create a light
        var ambientLight = new THREE.AmbientLight(0x666666);
        self.scene.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        self.scene.add(directionalLight);
        directionalLight.position.set(0, 0, 1);

        // create a 3d shape
        var cube = new THREE.CubeGeometry(100, 100, 100, 10, 10, 10);

        // create a material for the shape
        var cubeMaterial = new THREE.MeshLambertMaterial({
            color: 0xff0000,
            ambient: 0xff0000,
            transparent: true,
            wireframe: false
        });

        // combine the material and points into a 'mesh'
        self.cubeMesh = new THREE.Mesh(cube, cubeMaterial);
        self.cubeMesh.position.set(500, 500, 500);

        // add the shape to the scene
        self.scene.add(self.cubeMesh);

        self.camera.position.set(1000, 1000, 1000);
        self.camera.lookAt(new THREE.Vector3(0, 0, 0));

        self.update();
    }

    this.update = function() {

        self.cubeMesh.rotation.y += 0.05;
        self.cubeMesh.rotation.x += 0.05;
        self.cubeMesh.rotation.z += 0.05;

 
        self.renderer.render(self.scene, self.camera);
        requestAnimationFrame(self.update);
    }


    window.addEventListener('load', this.init);
}


var ps = new PlanetScene();