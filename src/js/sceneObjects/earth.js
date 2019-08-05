import earth_frag from 'SHADERS/earth_frag.glsl';
import earth_vert from 'SHADERS/earth_vert.glsl';
import simplexNoise3D from 'SHADERS/noise3D.glsl';
import {sharedUniforms} from 'SRC/js/utils/sharedUniforms.js';

export class Earth {
    constructor(scene) {
        var earthMaterial, earthObj, earthUniforms, sUniforms;
        sUniforms = sharedUniforms();

        /* Floating Island * */
        earthUniforms = {
            lightPos: {
                type: sUniforms["lightPos"].type,
                value: sUniforms["lightPos"].value,
            }
        };

        earthMaterial = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib["ambient"],
                THREE.UniformsLib["lights"],
                //earthUniforms
            ]),
            vertexShader: simplexNoise3D + earth_vert,
            fragmentShader: earth_frag,
            lights: true,
        });

        earthObj = new THREE.Mesh(new THREE.IcosahedronGeometry(20, 4), earthMaterial);
        scene.add(earthObj);
        scene.add( new THREE.AxesHelper( 50 ) );

        this.update = function (time) {
            earthObj.rotateY(0.002); //+= 0.002;
        };
    }
}
