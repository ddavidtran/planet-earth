varying float intensity;
varying vec3 vViewPosition;

void main() {
  vec3 vNormal = vec3(modelMatrix * vec4(normal, 0.0));
  intensity = pow(0.2 - dot(normalize(cameraPosition), vNormal), 2.8);

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}