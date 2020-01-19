import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import colors, { lightColors } from './colors';

export default _ => true;

const loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = () => { draw(); };

let height = window.innerHeight - 20;
let width = window.innerWidth - 20;

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
camera.position.set(0, 1, -2);
camera.lookAt(scene.position);


/* *******
* Lights *
******** */
const ambientLight = new THREE.AmbientLight(lightColors.softWhite, 1); // soft white light
scene.add(ambientLight);
const topLight = new THREE.PointLight(lightColors.softWhite, 5.8, 100);
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
  const mittenMaterial = new THREE.MeshPhongMaterial({ color: colors.lightBrown });
  // mittenRock = new THREE.Mesh(mittenRock.matrix, mittenMaterial)
  mittenRock.children.forEach(child => child.material = mittenMaterial)
  scene.add(mittenRock);
  console.log(mittenRock)
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
  mittenRock.rotation.y += 0.02;
  mittenRock.rotation.z += 0.02;

  renderer.render(scene, camera);
  requestAnimationFrame(draw);

};

const onWindowResize = () => {
  height = window.innerHeight - 20;
  width = window.innerWidth - 20;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

window.addEventListener('resize', onWindowResize);
