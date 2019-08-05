export class PointLight {
    constructor(scene) {
        var lightObj;
        lightObj= new THREE.PointLight(0xffffff, 30, 10, 2);
        lightObj.position.set(10, 60, 1);

        scene.add(lightObj);

        var sphereSize = 10;
        var pointLightHelper = new THREE.PointLightHelper(lightObj, sphereSize);
        scene.add(pointLightHelper);

        this.update = function (time) {
            
        };
    }
}

