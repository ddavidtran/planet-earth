varying vec3 vPosition;
varying vec3 vViewPosition;

uniform float u_time;

void main() {
  vPosition = position;
  
  float noise = 0.2 * snoise(3.*vec4(vPosition, u_time));
  
  /* Move the position along the normal and transform it with noise */
  vPosition = vPosition + normal * noise;

  //The light is in camera coordinates so need the vertex position in camera coords too.
  vViewPosition = vec3(modelViewMatrix * vec4(vPosition,1.0));
  gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );
}