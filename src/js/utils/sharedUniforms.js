export function sharedUniforms(){
    const sharedUniforms = {
        lightPos:{
          type: "v3",
          value: new THREE.Vector3(10, 60, 1)
        }
    }
    return sharedUniforms;
}