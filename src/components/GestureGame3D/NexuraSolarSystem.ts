import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export class ParticlesSwarm {
    container: HTMLElement;
    count: number;
    speedMult: number;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    composer: EffectComposer;
    dummy: THREE.Object3D;
    color: THREE.Color;
    target: THREE.Vector3;
    pColor: THREE.Color;
    geometry: THREE.TetrahedronGeometry;
    material: THREE.MeshBasicMaterial;
    mesh: THREE.InstancedMesh;
    positions: THREE.Vector3[];
    clock: THREE.Clock;
    onResizeHandler: () => void;

    constructor(container: HTMLElement, count = 20000) {
        this.count = count;
        this.container = container;
        this.speedMult = 1;
        
        // SETUP
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x000000, 0.01);
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.camera.position.set(0, 0, 100);
        
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;
        this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance", alpha: true });
        this.renderer.setSize(width, height);
        this.container.appendChild(this.renderer.domElement);

        // POST PROCESSING
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloomPass.strength = 1.8; bloomPass.radius = 0.4; bloomPass.threshold = 0;
        this.composer.addPass(bloomPass);

        // OBJECTS
        this.dummy = new THREE.Object3D();
        this.color = new THREE.Color();
        this.target = new THREE.Vector3();
        this.pColor = new THREE.Color();
        
        this.geometry = new THREE.TetrahedronGeometry(0.25);
        this.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        
        this.mesh = new THREE.InstancedMesh(this.geometry, this.material, this.count);
        this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.scene.add(this.mesh);
        
        this.positions = [];
        for(let i=0; i<this.count; i++) {
            this.positions.push(new THREE.Vector3((Math.random()-0.5)*100, (Math.random()-0.5)*100, (Math.random()-0.5)*100));
            this.mesh.setColorAt(i, this.color.setHex(0x00ff88));
        }
        
        this.clock = new THREE.Clock();
        this.onResizeHandler = this.onResize.bind(this);
        window.addEventListener('resize', this.onResizeHandler);
        this.animate();
    }
    
    onResize() {
        const width = this.container.clientWidth || window.innerWidth;
        const height = this.container.clientHeight || window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.composer.setSize(width, height);
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        const time = this.clock.getElapsedTime() * this.speedMult;
        
        type ShaderMaterialWithTime = THREE.MeshBasicMaterial & {
            uniforms?: { uTime?: { value: number } };
        };
        const materialWithUniforms = this.material as ShaderMaterialWithTime;
        if (materialWithUniforms.uniforms?.uTime) {
            materialWithUniforms.uniforms.uTime.value = time;
        }

        const addControl = (_id: string, _l: string, _min: number, _max: number, val: number): number => {
            return val;
        };
        const setInfo = (...args: unknown[]) => {
            void args;
        };
        const annotate = (...args: unknown[]) => {
            void args;
        };
        const count = this.count;
        
        for(let i=0; i<this.count; i++) {
            const target = this.target;
            const color = this.pColor;
            
            // INJECTED CODE
            // ── HYPERDIMENSIONAL VORTEX CONTROLS ────────────────────────
            const orbitSpeed = addControl("orbitSpeed", "Orbit Speed", 0.2, 1.8, 0.8);
            const vortexScale = addControl("vortexScale", "Vortex Scale", 5, 50, 25);
            const rotSpeed = addControl("rotSpeed", "Rotation Speed", 0.1, 3, 0.8);
            const harmonicChaos = addControl("chaos", "Harmonic Chaos", 0, 2, 0.6);
            const colorPhase = addControl("colorPhase", "Color Shift", 0, 1, 0);

            const t = time * orbitSpeed;
            const idx = i / count;
            
            const ringIdx = Math.floor(idx * 12);
            const ringPhase = (idx * 12) % 1;
            const baseRadius = 3 + ringIdx * 1.8;

            const theta = ringPhase * Math.PI * 2 + t * rotSpeed + Math.sin(ringPhase * Math.PI * 4 + t * 0.3) * harmonicChaos * 0.5;
            const phi = idx * Math.PI * 3 - t * 0.15 + Math.cos(t * 0.2 + idx * 2) * harmonicChaos;

            const pulse = baseRadius + Math.sin(ringPhase * Math.PI * 8 + t * 1.5) * (0.8 + harmonicChaos * 0.4);
            const rVal = pulse + Math.sin(t * 0.7 + i * 0.005) * 1.2;

            const x = Math.sin(phi) * Math.cos(theta) * rVal * vortexScale;
            const y = Math.cos(phi) * rVal * vortexScale + Math.sin(t * 0.4 + idx * 2.5) * harmonicChaos * 6;
            const z = Math.sin(phi) * Math.sin(theta) * rVal * vortexScale;
            
            target.set(x, y, z);
            
            // ── NEW HYPERDIMENSIONAL COLORS ────────────────────────────
            const hue = (idx * 0.7 + t * 0.08 + colorPhase) % 1;
            const saturation = 0.55 + Math.sin(ringPhase * Math.PI * 3 + t * 0.8) * 0.35;
            const luminance = 0.35 + Math.sin(phi * 2.5 + t * 1.2) * 0.18 + Math.sin(t + i * 0.008) * 0.12;

            color.setHSL(hue, Math.max(0.2, Math.min(0.95, saturation)), Math.max(0.15, Math.min(0.85, luminance)));
            
            if (i === 0) {
                setInfo("Hyperdimensional Vortex Flow", "A breathing 4D symphony of harmonic rings");
                annotate("vortexCore", new THREE.Vector3(0, 0, 0), "⊙");
            }
            
            // UPDATE
            this.positions[i].lerp(this.target, 0.1);
            this.dummy.position.copy(this.positions[i]);
            this.dummy.updateMatrix();
            this.mesh.setMatrixAt(i, this.dummy.matrix);
            this.mesh.setColorAt(i, this.pColor);
        }
        this.mesh.instanceMatrix.needsUpdate = true;
        if (this.mesh.instanceColor) {
            this.mesh.instanceColor.needsUpdate = true;
        }
        
        this.composer.render();
    }
    
    dispose() {
        window.removeEventListener('resize', this.onResizeHandler);
        this.geometry.dispose();
        this.material.dispose();
        this.scene.remove(this.mesh);
        this.renderer.dispose();
        if (this.container.contains(this.renderer.domElement)) {
            this.container.removeChild(this.renderer.domElement);
        }
    }
}
