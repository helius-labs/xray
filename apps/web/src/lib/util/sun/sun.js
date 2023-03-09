import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

// All bloompass necessaries
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
export const createScene = (el, assetsLoadedCb) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: false, canvas: el });

    /** Lights */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(25, 50, 25);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.2);
    pointLight2.position.set(-100, 200, 100);
    scene.add(pointLight2);

    /** Controls */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.1;
    controls.dampingFactor = 0.01;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = (Math.PI / 3) * 2;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));

    /** Load Sun Textures */
    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load("textures/1_blacked_50.jpg");
    const sunTexture2 = textureLoader.load("textures/2_50.png");

    sunTexture.wrapS = THREE.RepeatWrapping;
    sunTexture.wrapT = THREE.RepeatWrapping;
    sunTexture.repeat.set(1, 1);
    sunTexture.flipY = true;
    sunTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    sunTexture.minFilter = THREE.LinearFilter;
    sunTexture.magFilter = THREE.LinearFilter;

    sunTexture2.wrapS = THREE.RepeatWrapping;
    sunTexture2.wrapT = THREE.RepeatWrapping;
    sunTexture2.repeat.set(0.5, 0.5);
    sunTexture2.anisotropy = renderer.capabilities.getMaxAnisotropy();

    sunTexture2.minFilter = THREE.LinearFilter;
    sunTexture2.magFilter = THREE.LinearFilter;
    sunTexture2.flipY = true;

    const shader = new THREE.ShaderMaterial({
        uniforms: {
            myTexture: { value: sunTexture2 },
            alphaMap: { value: sunTexture2 },
            emissiveMap: { value: sunTexture2 },
            time: { value: 0 },
            color: { value: new THREE.Color(0x000000) },
            alphaTest: { value: 0.01 },
            emissiveIntensity: { value: 1.1 },
            edgeWidth: { value: 0.5 },
            edgeSharpness: { value: 0.01 },
        },
        vertexShader: `
      varying vec2 vUv;
  
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: `
      varying vec2 vUv;
      uniform sampler2D myTexture;
      uniform sampler2D alphaMap;
      uniform sampler2D emissiveMap;
      uniform float time;
      uniform vec3 color;
      uniform float alphaTest;
      uniform float emissiveIntensity;
      uniform float edgeWidth;
      uniform float edgeSharpness;
  
      void main() {
        vec2 uv = vUv;
        float speed = 0.2;
        float amplitude = 0.01;
        float frequency = 10.0;
  
        // Calculate the wave offset based on time and the UV coordinates
        float offset = sin(uv.y * frequency + time * speed) * amplitude;
  
        // Apply the offset to the UV coordinates
        uv.x += offset;
        uv.y += offset;
  
        // get alpha
        float alpha = texture2D(alphaMap, uv).r;
  
        // discard if alpha is too low
        if (alpha < alphaTest) {
            discard;
        }
  
        vec3 myColor = color;
        if (uv.x > 0.8) {
            myColor.g += uv.x / 2.0;
            myColor.b += uv.y;
        }
  
        // sample the emissive texture
        vec3 emissive = texture2D(emissiveMap, uv).rgb;
  
        // add emissive color to the final color
        myColor += emissive * emissiveIntensity;


        // edge blurring
        float edge = smoothstep(0.0, edgeWidth, min(uv.x, 1.0 - uv.x)) * 
                    smoothstep(0.0, edgeWidth, min(uv.y, 1.0 - uv.y));
        alpha *= edgeSharpness * (1.0 - edge) + edge;

        
        // make alpha max 0.5
        alpha = min(alpha, 0.2);
  
        gl_FragColor = vec4(myColor, alpha);
      }
    `,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        side: 2,
    });

    camera.position.z = 14;
    camera.fov = ((Math.atan(1 / camera.aspect) * 2 * 180) / Math.PI) * 1.05;
    camera.updateProjectionMatrix();

    let sunMesh,
        sunChild = null;
    let sun = null;

    const fbxLoader = new FBXLoader();
    fbxLoader.load("sun/sun.fbx", (fbx) => {
        fbx.scale.set(8, 8, 8);
        fbx.position.set(0, 0, 0);

        sun = fbx;

        fbx.traverse((child) => {
            if (child.isMesh) {
                if (child.name.includes("elio")) {
                    child.visible = false;
                } else if (child.name.toLowerCase().includes("rays")) {
                    child.material = shader;

                    child.renderOrder = 3;
                } else if (child.name.toLowerCase().includes("sun")) {
                    child.material.map = sunTexture;
                    child.material.transparent = true;
                    child.material.opacity = 0.3;
                    child.material.alphaMap = sunTexture;
                    sunChild = child;
                    sunMesh = new THREE.Mesh().copy(child, false);
                    sunMesh.material = new THREE.MeshPhongMaterial().copy(
                        child.material
                    );
                    sunMesh.scale.set(
                        fbx.scale.x * 1.005,
                        fbx.scale.y * 1.005,
                        fbx.scale.z * 1.005
                    );
                    sunMesh.renderOrder = 1;
                    child.renderOrder = 2;
                    sunMesh.rotateX(Math.PI / 2);
                    scene.add(sunMesh);
                }
            }
        });

        scene.add(fbx);
        assetsLoadedCb(render);
    });

    /** Apply bloom */
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5,
        0.4,
        0.85
    );
    bloomPass.threshold = 0;
    bloomPass.strength = 1.8 * (window.innerWidth < 600 ? 1.5 : 1);
    bloomPass.radius = 0.78;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    const clock = new THREE.Clock();

    function render() {
        const elapsedTime = Math.max(0, clock.getElapsedTime() - 1);

        shader.uniforms.time.value = elapsedTime;

        controls.update();

        requestAnimationFrame(render);

        if (sunMesh) {
            if (elapsedTime < 10) {
                let scale = elapsedTime / 8;
                scale = 8 * (1 - Math.exp(-8 * scale));
                scale = Math.min(8, scale);
                sunMesh.scale.setScalar(scale);
            }
            sunMesh.rotation.x += 0.0001;
            sunMesh.rotation.y += 0.0007;
        }

        if (sun) {
            if (elapsedTime < 10) {
                let scale = elapsedTime / 8;
                scale = 8 * (1 - Math.exp(-8 * scale));
                scale = Math.min(8, scale);
                sun.scale.setScalar(scale);
            }
            sun.rotation.y += 0.0007;
            sun.rotation.x += 0.0001;
        }

        composer.render(0.1);
    }

    render();

    function onWindowResize() {
        bloomPass.resolution.x = window.innerWidth;
        bloomPass.resolution.y = window.innerHeight;
        composer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        camera.fov = Math.min(
            123,
            ((Math.atan(1 / camera.aspect) * 2 * 180) / Math.PI) * 1.05
        );
        camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", onWindowResize, false);
};
