import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import colors, { lightColors } from './colors';
import { mittenRockMaterial, lights, rotation } from './settings';

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
camera.position.set(0, 0, -2);
camera.lookAt(0, 0, 0);


/* *******
* Lights *
******** */
const ambientLight = new THREE.AmbientLight(...lights.ambient); // soft white light
scene.add(ambientLight);
const pointLight = new THREE.PointLight(...lights.point);
pointLight.position.set(0, -1, -3);
pointLight.castShadow = true;
pointLight.shadowDarkness = 2;

pointLight.shadowCameraVisible = true;
scene.add(pointLight);



/* ************
* Mitten Rock *
************* */
export let mittenRock; // export for testing

const loader = new GLTFLoader(loadingManager);
const mittenRockLoaderCallback = gltb => {
  mittenRock = gltb.scene;

  const mittenMaterial = new THREE.MeshPhongMaterial(mittenRockMaterial);
  // mittenMaterial.flatShading = true;
  // mittenMaterial.shininess = 1000;


  mittenRock.children.forEach(child => child.material = mittenMaterial)
  mittenRock.castShadow = true;
  scene.add(mittenRock);
  console.log(mittenRock)
};


const wallGeometry = new THREE.PlaneGeometry(5, 5, 5, 1);
const wallMaterial = new THREE.MeshPhongMaterial({ color: colors.black, side: THREE.DoubleSide });
const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.y = 0;
wall.position.z = 2;
wall.receiveShadow = true;
scene.add(wall);


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
  mittenRock.rotation.x += rotation.x;
  mittenRock.rotation.y += rotation.y;
  mittenRock.rotation.z += rotation.z;

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
