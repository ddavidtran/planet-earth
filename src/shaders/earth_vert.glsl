uniform float altitude;
uniform float noiseOffset;
uniform float surfaceIntensity;

varying vec3 pos;
varying vec2 st;
varying float elevation;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying vec3 vNormal;


void main() {
  vWorldPosition = position;
  vNormal = normal;
  // apply noise to elevation
  elevation = 0.0;
  for (float i = 1.0; i < 10.0; i += 1.0) {
    elevation += (1.0 / i) * snoise(0.01 * i * vWorldPosition + 0.0);
  }
  // apply altitude
  elevation *= 4.;
  // move position along normal
  vWorldPosition = vWorldPosition + vNormal * elevation;
  //The light is in camera coordinates so need the vertex position in camera coords too.
  vViewPosition = vec3(modelViewMatrix * vec4(vWorldPosition,1.0));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(vWorldPosition, 1.0);
}