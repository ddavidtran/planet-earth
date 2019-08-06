import earth_frag from 'SHADERS/earth_frag.glsl';
import earth_vert from 'SHADERS/earth_vert.glsl';
import simplexNoise3D from 'SHADERS/noise3D.glsl';
import {sharedUniforms} from 'SRC/js/utils/sharedUniforms.js';
import * as dat from 'dat.gui';

export class Earth {
    constructor(scene) {
        var earthMaterial, earthObj, earthUniforms, sUniforms;
        sUniforms = sharedUniforms();

        var guiControls =  new function() {
            this.Amplitude = 0.6;
            this.Frequency = 0.8;
            this.Gain = 0.5;
            this.Lacunarity = 2.0;
          };
          
        const gui = new dat.GUI();
        var earthGUI = gui.addFolder('Earth');
        earthGUI.open();
        earthGUI.add(guiControls, 'Amplitude', 0, 1); 
        earthGUI.add(guiControls, 'Frequency', 0, 1); 
        earthGUI.add(guiControls, 'Gain', 0, 1);
        earthGUI.add(guiControls, 'Lacunarity', 0, 2.5);  


        /* Floating Island * */
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

        earthObj = new THREE.Mesh(new THREE.IcosahedronGeometry(20, 5), earthMaterial);
        scene.add(earthObj);
        scene.add( new THREE.AxesHelper( 50 ) );

        this.update = function (time) {
            sendUniforms();
            earthObj.rotateY(0.001); //+= 0.002;
        };

        function sendUniforms(){
            earthMaterial.uniforms['u_amplitude'].value = guiControls.Amplitude * 6.0;
            earthMaterial.uniforms['u_frequency'].value  = guiControls.Frequency / 10;
            earthMaterial.uniforms['u_gain'].value  = guiControls.Gain;
            earthMaterial.uniforms['u_lacunarity'].value  = guiControls.Lacunarity;    
        }
    }
}
