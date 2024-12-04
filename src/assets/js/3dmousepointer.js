import image from "./img";
import * as THREE from 'three';

import vertex from '../shader/vertex.glsl';
import fragment from '../shader/fragment.glsl';

const loader = new THREE.TextureLoader();
const texture1 = loader.load(image.avatar1);
const texture2 = loader.load(image.avatar3);
const texture3 = loader.load(image.avatar4);


class shaded {
    constructor() {
        this.container = document.querySelector('.landing');
        this.links = [...document.querySelectorAll('#rgbhover')];
        this.scene = new THREE.Scene();
        this.perespective = 1000;
        this.sizes = new THREE.Vector2(0,0);
        this.offset = new THREE.Vector2(0,0);
        this.uniforms = {
            uTexture : {value: texture1},
            uAlpha :{value: 0},
            uOffset :{value: new THREE.Vector2(0,0)},
            transparent:true,
        };
        this.links.map((link, i) =>{
            link.addEventListener('mouseenter' , ()=>{
                switch (i){
                    case 0:
                        this.uniforms.uTexture.value = texture1;
                    break;
                    case 1:
                        this.uniforms.uTexture.value = texture2;
                    break;
                    case 2:
                        this.uniforms.uTexture.value =texture3;
                    break;
                    case 3:
                        this.uniforms.uTexture.value = texture1;
                    break;
                }
            });
            link.addEventListener('mouseleave' , ()=>{
                this.uniforms.uAlpha.value = 0.0;
            });
        });
        this.setupCamera();
        this.createMesh();

    }
    get viewport(){
        let width = window.innerWidth;
        let height = window.innerHeight;
        let aspectRatio = width / height;
        let pixelRatio = window.devicePixelRatio;
        return{
            width, height, aspectRatio,
        };
    }

    setupCamera() {
        window.addEventListener('resize' , this.onResize.bind(this))
        let fov = (180 * (2 * Math.atan(this.viewport.height / 2 / this.perespective))) / Math.PI;
        this.camera = new THREE.PerspectiveCamera(fov, this.viewport.aspectRatio, 0.1 ,this.perespective);
        this.camera.position.set(0,0)
//renderer
this.renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha :true,
});
this.renderer.setSize(this.viewport.width , this.viewport.height);
this.renderer.setPixelRatio(this.viewport.pixelRatio);
this.container.appendChild(this.renderer.domElement);
    }

    createMesh () {
        this.geometry = new THREE.PlaneGeometry(1,1,20,20);
        this.material = new THREE.ShaderMaterial({
            uniforms : this.uniforms,
            vertexShader: vertex,
            fragmentShader : fragment,
            transparent: true,
        });


    }

    onResize(){
    this.camera.aspect = this.viewport.aspectRatio;
    this.camera.fov = (180 * (2 * Math.atan(this.viewport.height / 2 / this.perespective))) / Math.PI;
   this.renderer.setSize(this.viewport.width , this.viewport.height);
   this.camera.updateProjectionMatrix();


    }
}






