import glow_frag from 'SHADERS/glow_frag.glsl';
import glow_vert from 'SHADERS/glow_vert.glsl';
import {sharedUniforms} from 'SRC/js/utils/sharedUniforms.js';

export class Glow {
    constructor(scene) {
        var glowMaterial, glowObj, glowUniforms, sUniforms;
        sUniforms = sharedUniforms();

        /* Uniforms */
        glowUniforms = {
            lightPos: {
                type: sUniforms["lightPos"].type,
                value: sUniforms["lightPos"].value,
            }
        };

        /* Material */
        glowMaterial = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib["ambient"],
                THREE.UniformsLib["lights"],
                glowUniforms
            ]),
            vertexShader: glow_vert,
            fragmentShader: glow_frag,
            lights: true,
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending,
            transparent: true
        });

        /* Add object to scene */
        glowObj = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(35, 4), glowMaterial);
        scene.add(glowObj);

        this.update = function (time) {
        };

    }
}