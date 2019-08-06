varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying float noise;
varying float intensity;
uniform float u_time;

#define OCTAVES 1
float fbm(vec3 pos){
  vec3 shift = vec3(100.0);
  float value = 0.0;
  float amplitude = 0.5;

  for(int i = 0; i <  OCTAVES; i++){
    value += amplitude * cnoise(pos);
    pos *= 2.0 + shift;
    amplitude *= 0.5;
  }

  return value;
}

void main() {
  vPosition = position;
  vNormal = normal;
  
  noise = fbm((vPosition*0.10 - u_time*0.45)-0.45);
  vPosition = vPosition + vNormal * noise * 10.;

  //The light is in camera coordinates so need the vertex position in camera coords too.
  vViewPosition = vec3(modelViewMatrix * vec4(vPosition,1.0));
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );
}