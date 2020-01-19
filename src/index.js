import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default _ => true;

const loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = () => { draw(); };

const height = window.innerHeight - 20;
const width = window.innerWidth - 20;

/* ********
* Renderer *
********** */
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(width, height);
window.onload = () => {
  document.getElementById('canvas-container').appendChild(renderer.domElement);
};

/* ******
* Scene *
******* */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);


/* *******
* Camera *
******** */
const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
camera.position.set(0, 1, -5);
camera.lookAt(scene.position);


/* *******
* Lights *
******** */
const ambientLight = new THREE.AmbientLight(0xFEFEFE, 0.7); // soft white light
scene.add(ambientLight);
const topLight = new THREE.PointLight(0XFEFEFE, 1.8, 100);
topLight.position.set(0, 20, 22);
topLight.castShadow = true;
topLight.shadowDarkness = 2;

topLight.shadowCameraVisible = true; // for debugging
scene.add(topLight);


/* ************
* Mitten Rock *
************* */
let mittenRock;
const loader = new GLTFLoader(loadingManager);
const mittenRockLoaderCallback = gltb => {
  mittenRock = gltb.scene;
  scene.add(mittenRock);
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({ color: 0xF13F98 });
  const   matrix = new THREE.Mesh(geometry, material);
  matrix.position.set(0, 0.5, 0);
  matrix.castShadow = true;
  matrix.name = 'Cube';
  matrix.receiveShadow = true;
  scene.add(matrix)
};


loader.load( // pig
  'assets/mittenrock.glb',
  mittenRockLoaderCallback,
  xhr => console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`),
  err => console.error(err),
);

/* ***********
 * Main Loop *
 *************/
const draw = () => {
  
  // rotate some shiz
  mittenRock.rotation.x += 0.1;
  mittenRock.rotation.z += 0.1;

  renderer.render(scene, camera);
  requestAnimationFrame(draw);

};

const onWindowResize = () => {
  const newDimensions = getCanvasDimensions();
  height = newDimensions.height;
  width = newDimensions.width;



  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

window.addEventListener('resize', onWindowResize);
