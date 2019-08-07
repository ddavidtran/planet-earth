varying float elevation;
varying vec3 vViewPosition;
varying vec3 vPosition;

uniform float u_amplitude;
uniform float u_frequency;
uniform float u_gain;
uniform float u_lacunarity;

#define OCTAVES 5
float fbm(vec3 pos, float amplitude, float frequency, float gain, float lacunarity){
  float value = 0.0;

  for(int i = 0; i <  OCTAVES; i++){
    value += amplitude * snoise(pos * frequency);
    frequency *= lacunarity;
    amplitude *= gain;
  }

  return value;
}

void main() {
  vPosition = position;

  elevation = fbm(vPosition, u_amplitude, u_frequency, u_gain, u_lacunarity);
  
  /* Move the position along the normal and transform it with elevation */
  vPosition = vPosition + normal * elevation;

  //The light is in camera coordinates so need the vertex position in camera coords too.
  vViewPosition = vec3(modelViewMatrix * vec4(vPosition,1.0));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
}