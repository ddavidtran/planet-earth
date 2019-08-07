
#extension GL_OES_standard_derivatives : enable

varying vec3 vPosition;
varying vec3 vViewPosition;

uniform vec3 lightPos;


float clampDot(vec3 a, vec3 b) {
  return clamp(dot(a, b), 0.0, 1.0);
}

/* Phong Reflection Model */
vec4 calculateLightning(vec3 vViewPosition, vec3 newNormal){
  vec3 ambientColor = vec3(0.0/255.0, 0.0/255.0, 139.0/255.0); //Dark blue
  vec3 diffuseColor = vec3(0.0/255.0, 0.0/255.0, 139.0/255.0); //Dark blue
  vec3 specularColor = vec3(1.0);
  float ka = 0.2;
  float kd = 1.0;
  float ks = 1.0;
  float shininess = 15.0;
  vec3 lightDirection = normalize(lightPos -  vViewPosition);
  vec3 Rm = -reflect(lightDirection, newNormal);
  vec3 V = normalize(cameraPosition - vViewPosition);

  
  return vec4(ka * ambientColor + 
              kd *(clampDot(lightDirection,newNormal))*diffuseColor + 
              ks*pow(clampDot(Rm,V),shininess) * specularColor, 0.8);
}

void main () {
  vec3 newNormal = normalize(cross( dFdx( vPosition ), dFdy( vPosition ) ));

  /* Calculate lightning */
  vec4 lightning = calculateLightning(vViewPosition, newNormal);

  gl_FragColor = lightning;
}