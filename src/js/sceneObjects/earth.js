import earth_frag from 'SHADERS/earth_frag.glsl';
import earth_vert from 'SHADERS/earth_vert.glsl';
import simplexNoise3D from 'SHADERS/noise3D.glsl';
import {sharedUniforms} from 'SRC/js/utils/sharedUniforms.js';

export class Earth {
    constructor(scene, gui) {
        var earthMaterial, earthObj, earthUniforms, sUniforms;
        sUniforms = sharedUniforms();

        /* Setup GUI Controls for Earth */
        var guiControls =  new function() {
            this.Amplitude = 0.6;
            this.Frequency = 0.8;
            this.Gain = 0.5;
            this.Lacunarity = 2.0;
          };
        var earthGUI = gui.addFolder('Earth');
        earthGUI.open();
        earthGUI.add(guiControls, 'Amplitude', 0, 1); 
        earthGUI.add(guiControls, 'Frequency', 0, 1); 
        earthGUI.add(guiControls, 'Gain', 0, 1);
        earthGUI.add(guiControls, 'Lacunarity', 0, 2.5);  

        /* Uniforms */
        earthUniforms = {
            lightPos: {
                type: sUniforms["lightPos"].type,
                value: sUniforms["lightPos"].value,
            },
            u_amplitude:{
                type: "f",
                value: 0.0
              },
              u_frequency:{
                type: "f",
                value: 0.0
              },
              u_gain:{
                type: "f",
                value: 0.0
              },
              u_lacunarity:{
                type: "f",
                value: 0.0
              }
        };

        /* Material */
        earthMaterial = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib["ambient"],
                THREE.UniformsLib["lights"],
                earthUniforms
            ]),
            vertexShader: simplexNoise3D + earth_vert,
            fragmentShader: simplexNoise3D + earth_frag,
            lights: true,
        });
        
        /* Add object to scene */
        earthObj = new THREE.Mesh(new THREE.IcosahedronGeometry(20, 5), earthMaterial);
        scene.add(earthObj);

        this.update = function () {
            sendUniforms();
            earthObj.rotateY(0.001); 
        };

        function sendUniforms(){
            earthMaterial.uniforms['u_amplitude'].value = guiControls.Amplitude * 6.0;
            earthMaterial.uniforms['u_frequency'].value  = guiControls.Frequency / 10;
            earthMaterial.uniforms['u_gain'].value  = guiControls.Gain;
            earthMaterial.uniforms['u_lacunarity'].value  = guiControls.Lacunarity;    
        }
    }
}
