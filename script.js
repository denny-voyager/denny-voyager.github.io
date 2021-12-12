var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 25;

var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setClearColor("#C2C2C2");
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
   renderer.setSize(window.innerWidth,window.innerHeight);
   camera.aspect = window.innerWidth / window.innerHeight;

   camera.updateProjectionMatrix();
});

var light = new THREE.PointLight(0xFFFFFF,1.4,1000);
light.position.set(0,15,15);
scene.add(light);

var myObj;

var mtlLoader = new THREE.MTLLoader();
mtlLoader.load('token.mtl', function(materials) {
   materials.preload();

   var objLoader = new THREE.OBJLoader();
   objLoader.setMaterials(materials);
   objLoader.load('token.obj', function(object) {
      scene.add(object);

      myObj = object;
      object.position.x = 0;
      object.position.z -= 150;
      object.position.y = -90;
      object.rotation.x = 0;
   });
});

var render = function() { 
   requestAnimationFrame(render);
   myObj.rotation.y -= .012;

   renderer.render(scene, camera);
}

render();

