import ocean_frag from 'SHADERS/ocean_frag.glsl';
import ocean_vert from 'SHADERS/ocean_vert.glsl';
import {sharedUniforms} from 'SRC/js/utils/sharedUniforms.js';
import simplexNoise4D from 'SHADERS/noise4D.glsl';

export class Ocean {
    constructor(scene,gui) {
        var oceanMaterial, oceanObj, oceanUniforms, sUniforms;
        var start = Date.now();
        sUniforms = sharedUniforms();
        
        /* Setup GUI Controls for Ocean */
        var guiControls =  new function() {
            this.WaterLevel = 1.0;
          };
        var oceanGUI = gui.addFolder('Ocean');
        oceanGUI.open();
        oceanGUI.add(guiControls, 'WaterLevel', 0.8, 1.05); 

        /* Uniforms */
        oceanUniforms = {
            lightPos: {
                type: sUniforms["lightPos"].type,
                value: sUniforms["lightPos"].value,
            },
            u_time: {
                type: "f",
                value: 0.0
            }
        };

        /* Material */
        oceanMaterial = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib["ambient"],
                THREE.UniformsLib["lights"],
                oceanUniforms
            ]),
            vertexShader: simplexNoise4D + ocean_vert,
            fragmentShader: simplexNoise4D + ocean_frag,
            lights: true,
            transparent: true
        });

        /* Add object to scene */
        oceanObj = new THREE.Mesh(new THREE.IcosahedronGeometry(19, 5), oceanMaterial);
        scene.add(oceanObj);

        this.update = function () {
            oceanObj.rotateY(0.001); 
            oceanObj.scale.set(guiControls.WaterLevel, guiControls.WaterLevel, guiControls.WaterLevel);
            oceanMaterial.uniforms['u_time'].value = .00025 * ( Date.now() - start );
        };

    }
}