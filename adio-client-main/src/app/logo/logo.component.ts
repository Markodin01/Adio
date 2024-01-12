import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
  }

  @ViewChild('canvas') canvasRef: ElementRef | undefined;

  @Input() public rotationSpeedX: number = 0.0;
  @Input() public rotationSpeedY: number = 0.003;
  @Input() public rotationSpeedZ: number = 0.0;
  @Input() public size: number = 200;

  @Input() public cameraX: number = 0;
  @Input() public cameraY: number = 0;
  @Input() public cameraZ: number = 1000;

  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;

  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef?.nativeElement;
  }

  private logo: THREE.Mesh;

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  private createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000); // TODO: change to black

    const loader = new GLTFLoader();
    loader.load(
      'assets/adiologo/logoshape5.glb',
      (glb) => {
        var mesh = glb.scene.children[0] as THREE.Mesh;
        mesh.material = new THREE.MeshBasicMaterial({
          color: 0xc300ff,
          wireframe: true,
        });
        this.logo = mesh;
        this.scene.add(this.logo);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      function (error) {
        console.log('An error occurred');
      }
    );

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.x = this.cameraX;
    this.camera.position.y = this.cameraY;
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  // private onWindowResize() {
  //   this.camera.aspect = window.innerWidth / window.innerHeight;
  //   this.camera.updateProjectionMatrix();

  // }

  // ngOnInit() {
  //   // ...
  //   window.addEventListener('resize', this.onWindowResize.bind(this));
  // }

  // ngOnDestroy() {
  //   // ...
  //   window.removeEventListener('resize', this.onWindowResize.bind(this));
  // }

  private animateLogo() {
    this.logo.rotation.x += this.rotationSpeedX;
    this.logo.rotation.y += this.rotationSpeedY;
    this.logo.rotation.z += this.rotationSpeedZ;
  }

  private startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    let component: LogoComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateLogo();
      component.renderer.render(component.scene, component.camera);
    })();
  }
}
