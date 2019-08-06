varying float intensity;
varying vec3 vViewPosition;

void main() {
  /* Calculates dot product of the view vector (cameraPosition) and the normal */
  /* High value exponent = less intense since dot product is always less than 1 */
  vec3 vNormal = vec3(modelMatrix * vec4(normal, 0.0));
  intensity = pow(0.2 - dot(normalize(cameraPosition), vNormal), 2.8);

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}