varying float intensity;

void main() {
  vec3 glow = vec3(255.0/255.0, 255.0/255.0, 255.0/255.0) * intensity;
  gl_FragColor = vec4( glow, 1.0);
}
