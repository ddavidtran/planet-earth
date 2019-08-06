
#extension GL_OES_standard_derivatives : enable

varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying float noise;

uniform vec3 lightPos;

vec4 calculateLightning(vec3 vViewPosition, vec3 newNormal){
  vec3 lightDirection = normalize(lightPos -  vViewPosition);
  float ka = 2.5;
  float kd = 1.0;
  
  //Apply ambient and diffuse phong
  vec3 ambient = vec3(ka);
  vec3 diffuse = vec3(kd * max(0., dot(lightDirection, newNormal)));
  return vec4(ambient+diffuse,1.0);
}

void main() {
    vec3 newNormal = normalize(cross( dFdx( vViewPosition ), dFdy( vViewPosition ) ));

    vec4 finalColor;
    vec4 cloud1 = vec4(0.0/255.0, 0.0/255.0, 0.0/255.0, 0.0);
    vec4 cloud2 = vec4(255.0/255.0, 255.0/255.0, 255.0/255.0, 0.8);
    float colorStep = smoothstep(0.0 ,.2, noise);
    finalColor = mix(cloud1, cloud2, colorStep);    

    vec4 lightning = calculateLightning(vViewPosition, newNormal);
    gl_FragColor = finalColor * lightning;
}