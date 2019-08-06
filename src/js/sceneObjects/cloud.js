import clouds_frag from 'SHADERS/clouds_frag.glsl';
import clouds_vert from 'SHADERS/clouds_vert.glsl';
import {sharedUniforms} from 'SRC/js/utils/sharedUniforms.js';
import perlionNoise3D from 'SHADERS/classicnoise3D.glsl';

export class Cloud {
    constructor(scene) {
        var cloudMaterial, cloudObj, cloudUniforms, sUniforms;
        var start = Date.now();
        sUniforms = sharedUniforms();

        cloudUniforms = {
            lightPos: {
                type: sUniforms["lightPos"].type,
                value: sUniforms["lightPos"].value,
            },
            u_time: {
                type: "f",
                value: 0.0
            }
        };

        cloudMaterial = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib["ambient"],
                THREE.UniformsLib["lights"],
                cloudUniforms
            ]),
            vertexShader: perlionNoise3D + clouds_vert,
            fragmentShader: perlionNoise3D + clouds_frag,
            lights: true,
        });
        cloudMaterial.transparent = true;
        cloudObj = new THREE.Mesh(new THREE.IcosahedronGeometry(27, 5), cloudMaterial);
        
        scene.add(cloudObj);

        this.update = function (time) {
            //cloudObj.rotateY(0.001); 
            cloudMaterial.uniforms['u_time'].value = .00025 * ( Date.now() - start );
        };

    }
}