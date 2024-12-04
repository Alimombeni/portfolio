import * as THREE from 'three';
import image from "./img";
const container = document.querySelector('.three_bg');
// for loading texture in object
const loader = new THREE.TextureLoader();
// initial scenes
const scene = new THREE.Scene();
// initial camera
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1 , 1000);
// render the 3d object in screen
const renders = new THREE.WebGLRenderer({
    antialias:true,
});
renders.setSize(window.innerWidth , window.innerHeight);
// add 3d object to document
container.appendChild(renders.domElement);
// responsive
window.addEventListener('resize' , ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renders.setSize(window.innerWidth , window.innerHeight);
});
// initial material and geometric
const geometry = new THREE.PlaneGeometry( 18, 10 ,15 ,9 );
const material = new THREE.MeshBasicMaterial(
    {
        // color: 0xdd1818,
    map:loader.load(image.bg3),
        // wireframe:true,
         });
// combination geometry and material together --> in mesh
const mesh = new THREE.Mesh(geometry , material);
scene.add(mesh);
// initial camera position for point of view
camera.position.z = 5;
// create function for animate object

const calc = geometry.attributes.position.count;
const clock = new THREE.Clock();

function animate() {
    const time = clock.getElapsedTime();
    for (let i = 0 ; i < calc ; i++){
        // animation
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);
        const animation1 =  0.75 * Math.sin(x * 2 + time * 0.7) ;
        const animation2 =  0.25 * Math.sin(x  + time * 0.7) ;
        const animation3 =  0.1 * Math.sin(y * 15 + time * 0.7) ;
        geometry.attributes.position.setZ(i ,animation1 , animation2 , animation3);

        geometry.computeVertexNormals();
        geometry.attributes.position.needsUpdate = true;
    }
// mesh.rotation.x +=0.01;
// mesh.rotation.y += 0.01;
    requestAnimationFrame(animate);
    renders.render(scene , camera);
}
animate();









