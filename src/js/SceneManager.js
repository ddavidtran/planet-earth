import {PointLight} from 'SRC/js/sceneObjects/pointLight.js';
import {Earth} from 'SRC/js/sceneObjects/earth.js';
import {Ocean} from 'SRC/js/sceneObjects/ocean.js';
import {Cloud} from 'SRC/js/sceneObjects/cloud.js';

import * as Stats from 'stats.js';
import { Glow } from './sceneObjects/glow';

export default class SceneManager {
    constructor(canvas) {
        var skyboxLoader, skyboxTexture;
        /*Stats.js*/
        var stats = new Stats();
        stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(stats.dom);

        /* Orbit Controls */
        var OrbitControls = require('three-orbit-controls')(THREE);

        const clock = new THREE.Clock();
        const screenDimensions = {
            width: canvas.innerWidth, 
            height: canvas.innerHeight
        };
        const scene = buildScene();
        const renderer = buildRenderer(screenDimensions);
        var camera = buildCamera(screenDimensions);
        const sceneSubjects = createSceneSubjects(scene);
        
        function buildScene() {
            /* Add skybox */
            skyboxLoader = new THREE.CubeTextureLoader();
            skyboxTexture = skyboxLoader.load([
                require('ASSETS/pos-x.png'),
                require('ASSETS/neg-x.png'),
                require('ASSETS/pos-y.png'),
                require('ASSETS/neg-y.png'),
                require('ASSETS/pos-z.png'),
                require('ASSETS/neg-z.png'),
            ])
            const scene = new THREE.Scene();
            scene.background = skyboxTexture;

            return scene;
        }

        function buildRenderer({ width, height }) {
            const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);

            renderer.gammaInput = true;
            renderer.gammaOutput = true; 

            return renderer;
        }

        function buildCamera({ width, height }) {
            camera = new THREE.PerspectiveCamera(30, width / height, 1, 10000);
            camera.position.z = 150;
            var cameraControls = new OrbitControls(camera, renderer.domElement);
            cameraControls.update();
            return camera;
        }

        function createSceneSubjects(scene) {
            const sceneSubjects = [
                new PointLight(scene),
                new Earth(scene),
                new Ocean(scene),
                new Cloud(scene),
                new Glow(scene)
            ];
            return sceneSubjects;
        }

        this.update = function () {
            stats.begin();
            const elapsedTime = clock.getElapsedTime();
            for (let i = 0; i < sceneSubjects.length; i++)
                sceneSubjects[i].update(elapsedTime);
            renderer.render(scene, camera);
            stats.end();
        };

        this.onWindowResize = function () {
            const { width, height } = canvas;

            screenDimensions.width = width;
            screenDimensions.height = height;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
        };
    }
}
