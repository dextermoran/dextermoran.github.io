var scene, camera, renderer;
var geometry, material, mesh;
var boxes = [];
var radius = 2000;
var nBoxes = 5;

init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    geometry = new THREE.BoxGeometry(200, 200, 200);
    material = new THREE.MeshLambertMaterial({
        color: 0xccccff,
        wireframe: false
    });


    // mesh = new THREE.Mesh(geometry, material);
    // mesh.position.set(300, 0, 0);
    //
    // scene.add(mesh);

    // create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = -400;
    pointLight.position.y = 400;
    pointLight.position.z = 200;

    // add to the scene
    scene.add(pointLight);
    var light = new THREE.AmbientLight( 0x404040 ); // soft white light -- im testing this line and the next
    scene.add( light );

//begin here


    for(var i =0; i<nBoxes; i++){
      mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );
      mesh.position.set(radius/2 - radius * Math.random(),
                        radius/2 - radius * Math.random(),
                        .5 * Math.random());
     boxes.push(mesh);
    }



//end here

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer = new THREE.WebGLRenderer( { alpha: true } ) // makes bg transparent but in a really weird way
    renderer.setClearColor(0xf2f2f2, 1); //testing this shit for a transparent background

    document.body.appendChild(renderer.domElement);

}

function animate() {

    requestAnimationFrame(animate);

//comment these out to test the loop
    // mesh.rotation.x += 0.0005;
    // mesh.rotation.y += 0.001;


//begin here
    for(var i =0; i<boxes.length; i++){
      boxes[i].rotation.x += (Math.random() * 0.01 + 0.00005);
      boxes[i].rotation.y += (Math.random() * 0.01 + 0.00001);

      if(boxes[i].position.y < -1000){
        boxes[i].position.y = 1000;
      } else {
          boxes[i].position.y -= (Math.random() * 3);
        }

    }

//end here
    renderer.render(scene, camera);

}
