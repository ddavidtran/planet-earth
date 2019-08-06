import glow_frag from 'SHADERS/glow_frag.glsl';
import glow_vert from 'SHADERS/glow_vert.glsl';
import {sharedUniforms} from 'SRC/js/utils/sharedUniforms.js';

export class Glow {
    constructor(scene) {
        var glowMaterial, glowObj, glowUniforms, sUniforms;
        sUniforms = sharedUniforms();

        glowUniforms = {
            lightPos: {
                type: sUniforms["lightPos"].type,
                value: sUniforms["lightPos"].value,
            }
        };

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

        glowObj = new THREE.Mesh(new THREE.IcosahedronGeometry(35, 5), glowMaterial);
        
        scene.add(glowObj);

        this.update = function (time) {
        };

    }
}