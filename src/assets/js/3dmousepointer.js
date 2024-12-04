import image from "./img";
import * as THREE from 'three';
import vertex from '../shader/vertex.glsl';
import fragment from '../shader/fragment.glsl';
const loader = new THREE.TextureLoader();
const texture1 = loader.load(image.avatar1);
const texture2 = loader.load(image.avatar3);
const texture3 = loader.load(image.avatar4);

function lerp(start,end,t){
    return start * (1 - t) + end * t;
}

class shaded {
    constructor() {
        this.container = document.querySelector('.landing');
        this.inner = document.querySelector('.intro');
        this.links = [...document.querySelectorAll('.rgbhover')];
        this.targetX =0;
        this.targetY=0;
        this.scene = new THREE.Scene();
        this.perespective = 1000;
        this.sizes = new THREE.Vector2(0,0);
        this.offset = new THREE.Vector2(0,0);
        this.uniforms = {
            uTexture : {value: texture1},
            uAlpha :{value: 0.0},
            uOffset :{value: new THREE.Vector2(0.0,0.0)},
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
                this.uniforms.uAlpha.value = lerp(this.uniforms.uAlpha.value ,0.0,0.1);
            });
        });
        this.checkHovered();
        this.setupCamera();
        this.followMouseMove();
        this.createMesh();

    }
    get viewport(){
        let width = window.innerWidth;
        let height = window.innerHeight;
        let aspectRatio = width / height;
        let pixelRatio = window.devicePixelRatio;
        return{
            width, height, aspectRatio,pixelRatio,
        };
    }


    checkHovered(){
    this.inner.addEventListener('mouseenter' , ()=>{
        this.hovered = true;
    });
    this.inner.addEventListener('mouseleave' , ()=>{
        this.hovered= false;
        this.uniforms.uTexture = {value:texture1};
    })
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
        this.mesh = new THREE.Mesh(this.geometry , this.material);
        this.sizes.set(370, 470, 1);
        this.mesh.scale.set(this.sizes.x , this.sizes.y , 1);
        this.mesh.position.set(this.offset.x , this.offset.y , 0);
        this.scene.add(this.mesh);




    }
    followMouseMove(){
        window.addEventListener('mousemove', (e)=>{
            this.targetX=e.clientX;
            this.targetY=e.clientY;
        });
    }
    onResize(){
    this.camera.aspect = this.viewport.aspectRatio;
    this.camera.fov = (180 * (2 * Math.atan(this.viewport.height / 2 / this.perespective))) / Math.PI;
   this.renderer.setSize(this.viewport.width , this.viewport.height);
   this.camera.updateProjectionMatrix();


    }
}






