
#extension GL_OES_standard_derivatives : enable

varying vec3 vPosition;
varying vec3 vViewPosition;
varying vec3 vNormal;
varying float elevation;

uniform vec3 lightPos;
uniform float u_time;

struct PointLight {
    vec3 position;
    vec3 color;
};

uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

vec4 calculateLightning(vec3 vViewPosition, vec3 newNormal){
  vec3 lightDirection = normalize(lightPos -  vViewPosition);
  float ka = 0.5;
  float kd = 1.0;
  
  //Apply ambient and diffuse phong
  vec3 ambient = vec3(ka);
  vec3 diffuse = vec3(kd * max(0., dot(lightDirection, newNormal)));
  return vec4(ambient+diffuse,1.0);
}

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
  vec3 newNormal = normalize(cross( dFdx( vViewPosition ), dFdy( vViewPosition ) ));

  vec4 finalColor, topMountainColor, mountainColor, terrainColor;

  /* Color top mountain */
  vec4 topMountain1 = vec4(255.0/255.0, 255.0/255.0, 255.0/255.0, 1.0);
  vec4 topMountain2 = vec4(220.0/255.0, 220.0/255.0, 220.0/255.0, 1.0);
  float color_step = smoothstep(5.0 ,10.0, elevation);
  topMountainColor = mix(topMountain1, topMountain2, color_step);

  /* Color mountain */
  vec4 mountain1 = vec4(50.0/255.0, 50.0/255.0, 50.0/255.0, 1.0);
  vec4 mountain2 = vec4(32.0/255.0, 32.0/255.0, 32.0/255.0, 1.0);
  color_step = smoothstep(.9, 3.5, elevation);
  mountainColor = mix(mountain1,mountain2, color_step);

  /* Color green terrain */
  /*vec4 green1 = vec4(0.0/255.0, 102.0/255.0, 0.0/255.0, 1.0);
  vec4 green2 = vec4(0.0/255.0, 153.0/255.0, 0.0/255.0, 1.0);*/
  vec4 dirt = vec4(63.0/255.0, 42.0/255.0, 20.0/255.0, 1.0);
  vec4 green = vec4(0.0/255.0, 102.0/255.0, 0.0/255.0, 1.0);
  float terrainNoise = fbm(vPosition*0.3, 1.5, .8, 0.5, 2.0);
  float terrainStep = smoothstep(0.,1., terrainNoise);
  
  terrainColor = mix(dirt,green, terrainStep);
  float greens_step = 1.0 - smoothstep(0.0, 0.2, elevation);
  
  /* Sand */
  /*vec4 sand1 = vec4(244.0/255.0, 164.0/255.0, 96.0/255.0, 1.0);
  vec4 sand2 = vec4(255.0/255.0, 228.0/255.0, 181.0/255.0, 1.0);
  float sandNoise = fbm(vPosition, 1.5, .8, 0.5, 2.0);*/

  finalColor = mix(mountainColor, topMountainColor, color_step);
  finalColor = mix(finalColor, terrainColor, greens_step);

  vec4 lightning = calculateLightning(vViewPosition, newNormal);

  gl_FragColor = finalColor * lightning;// * lightning;
}