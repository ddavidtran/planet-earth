import ocean_frag from 'SHADERS/ocean_frag.glsl';
import ocean_vert from 'SHADERS/ocean_vert.glsl';
import {sharedUniforms} from 'SRC/js/utils/sharedUniforms.js';
import simplexNoise3D from 'SHADERS/noise3D.glsl';
import {datGUI} from 'SRC/js/utils/datGUI.js';

export class Ocean {
    constructor(scene) {
        var oceanMaterial, oceanObj, oceanUniforms, sUniforms;
        sUniforms = sharedUniforms();

        var gui;
        gui = datGUI();
        var guiControls =  new function() {
            this.Scale = 1.0;
          };
          
        var oceanGUI = gui.addFolder('Ocean');
        oceanGUI.open();
        oceanGUI.add(guiControls, 'Scale', 0.8, 1.05); 

        oceanUniforms = {
            lightPos: {
                type: sUniforms["lightPos"].type,
                value: sUniforms["lightPos"].value,
            },
        };

        oceanMaterial = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib["ambient"],
                THREE.UniformsLib["lights"],
                oceanUniforms
            ]),
            vertexShader: simplexNoise3D + ocean_vert,
            fragmentShader: simplexNoise3D + ocean_frag,
            lights: true,
        });
        oceanMaterial.transparent = true;

        oceanObj = new THREE.Mesh(new THREE.IcosahedronGeometry(19, 5), oceanMaterial);
        
        scene.add(oceanObj);

        this.update = function (time) {
            //oceanObj.scale(1.0,1.0,1.0);
            oceanObj.scale.set(guiControls.Scale, guiControls.Scale, guiControls.Scale);
        };

    }
}