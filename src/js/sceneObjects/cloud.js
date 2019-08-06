import clouds_frag from 'SHADERS/clouds_frag.glsl';
import clouds_vert from 'SHADERS/clouds_vert.glsl';
import {sharedUniforms} from 'SRC/js/utils/sharedUniforms.js';
import perlionNoise3D from 'SHADERS/classicnoise3D.glsl';

export class Cloud {
    constructor(scene, gui) {
        var cloudMaterial, cloudObj, cloudUniforms, sUniforms;
        var start = Date.now();
        sUniforms = sharedUniforms();

        /* Setup GUI Controls for Cloud */
        var guiControls =  new function() {
            this.CloudSpeed = 0.45;
          };
        var cloudGUI = gui.addFolder('Cloud');
        cloudGUI.open();
        cloudGUI.add(guiControls, 'CloudSpeed', 0, 10);

        /* Uniforms */
        cloudUniforms = {
            lightPos: {
                type: sUniforms["lightPos"].type,
                value: sUniforms["lightPos"].value,
            },
            u_time: {
                type: "f",
                value: 0.0
            },
            u_speed:{
                type: "f",
                value: 0.0
            }
        };

        /* Material */
        cloudMaterial = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib["ambient"],
                THREE.UniformsLib["lights"],
                cloudUniforms
            ]),
            vertexShader: perlionNoise3D + clouds_vert,
            fragmentShader: perlionNoise3D + clouds_frag,
            lights: true,
            transparent: true
        });

        /* Add object to scene */
        cloudObj = new THREE.Mesh(new THREE.IcosahedronGeometry(27, 5), cloudMaterial);
        scene.add(cloudObj);

        this.update = function () {
            cloudMaterial.uniforms['u_speed'].value  = guiControls.CloudSpeed;    
            cloudMaterial.uniforms['u_time'].value = .00025 * ( Date.now() - start );
        };
    }
}