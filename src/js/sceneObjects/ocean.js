import ocean_frag from 'SHADERS/ocean_frag.glsl';
import ocean_vert from 'SHADERS/ocean_vert.glsl';
import {sharedUniforms} from 'SRC/js/utils/sharedUniforms.js';
import simplexNoise4D from 'SHADERS/noise4D.glsl';
import {datGUI} from 'SRC/js/utils/datGUI.js';

export class Ocean {
    constructor(scene) {
        var oceanMaterial, oceanObj, oceanUniforms, sUniforms;
        var start = Date.now();
        sUniforms = sharedUniforms();
        var gui;
        gui = datGUI();
        var guiControls =  new function() {
            this.WaterLevel = 1.0;
          };
          
        var oceanGUI = gui.addFolder('Ocean');
        oceanGUI.open();
        oceanGUI.add(guiControls, 'WaterLevel', 0.8, 1.05); 
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

        oceanMaterial = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib["ambient"],
                THREE.UniformsLib["lights"],
                oceanUniforms
            ]),
            vertexShader: simplexNoise4D + ocean_vert,
            fragmentShader: simplexNoise4D + ocean_frag,
            lights: true,
        });
        oceanMaterial.transparent = true;

        oceanObj = new THREE.Mesh(new THREE.IcosahedronGeometry(19, 5), oceanMaterial);
        
        scene.add(oceanObj);

        this.update = function (time) {
            oceanObj.rotateY(0.001); 
            oceanObj.scale.set(guiControls.WaterLevel, guiControls.WaterLevel, guiControls.WaterLevel);
            oceanMaterial.uniforms['u_time'].value = .00025 * ( Date.now() - start );
        };

    }
}