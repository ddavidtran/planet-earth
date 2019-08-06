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

float surface3( vec3 coord ){
    float height = 0.0;
    coord	*= 0.8;
    height	+= abs(cnoise(coord)) * 1.0;
    height	+= abs(cnoise(coord * 2.0)) * 0.5;
    height	+= abs(cnoise(coord * 4.0)) * 0.25;
    height	+= abs(cnoise(coord * 8.0)) * 0.125;
    return height;
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