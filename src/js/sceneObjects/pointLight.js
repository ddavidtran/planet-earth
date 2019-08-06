export class PointLight {
    constructor(scene) {
        var lightObj;
        lightObj= new THREE.PointLight(0xffffff, 30, 10, 2);
        lightObj.position.set(10, 60, 1);
        scene.add(lightObj);

        this.update = function () {
            
        };
    }
}

