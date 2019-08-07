
#extension GL_OES_standard_derivatives : enable

varying vec3 vPosition;
varying vec3 vViewPosition;
varying float elevation;

uniform vec3 lightPos;
uniform float u_time;

vec4 calculateLightning(vec3 vViewPosition, vec3 newNormal){
  vec3 lightDirection = normalize(lightPos -  vViewPosition);
  float ka = .5;
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
  vec3 newNormal = normalize(cross( dFdx( vPosition ), dFdy( vPosition ) ));

  vec4 finalColor, topMountainColor, mountainColor, terrainColor;

  /* Hermite interpolation and linear interpolation for top of the mountains */
  vec4 topMountain1 = vec4(255.0/255.0, 255.0/255.0, 255.0/255.0, 1.0);
  vec4 topMountain2 = vec4(220.0/255.0, 220.0/255.0, 220.0/255.0, 1.0);
  float colorStep = smoothstep(5.0 ,10.0, elevation);
  topMountainColor = mix(topMountain1, topMountain2, colorStep);

  /* Hermite interpolation and linear interpolation for mountains */
  vec4 mountain1 = vec4(50.0/255.0, 50.0/255.0, 50.0/255.0, 1.0);
  vec4 mountain2 = vec4(32.0/255.0, 32.0/255.0, 32.0/255.0, 1.0);
  colorStep = smoothstep(.9, 3.5, elevation);
  mountainColor = mix(mountain1,mountain2, colorStep);

  /* Hermite interpolation and linear interpolation for dirt/green */
  vec4 dirt = vec4(63.0/255.0, 42.0/255.0, 20.0/255.0, 1.0);
  vec4 green = vec4(0.0/255.0, 102.0/255.0, 0.0/255.0, 1.0);
  float terrainNoise = fbm(vPosition*0.3, 1.5, .8, 0.5, 2.0);
  float terrainStep = smoothstep(0.,1., terrainNoise);
  
  terrainColor = mix(dirt,green, terrainStep);
  float dirtGreenStep = 1.0 - smoothstep(-0.5, 0.2, elevation);
  
  /* Hermite interpolation and linear interpolation for sand (under water) */
  vec4 sand1 = vec4(244.0/255.0, 164.0/255.0, 96.0/255.0, 1.0);
  vec4 sand2 = vec4(255.0/255.0, 228.0/255.0, 181.0/255.0, 1.0);
  float sandNoise = fbm(vPosition, 10.5, 10., .5, 2.0);
  float sandStep = smoothstep(0.,1.5, sandNoise);
  vec4 sandColor = mix(sand1,sand2, sandStep);
  float finalSandStep = 1.0 - smoothstep(-6.5,-0.5, elevation);

  /* Final color, assemble! */
  finalColor = mix(mountainColor, topMountainColor, colorStep);
  finalColor = mix(finalColor, terrainColor, dirtGreenStep);
  finalColor = mix(finalColor, sandColor, finalSandStep);

  /* Calculate lightning */
  vec4 lightning = calculateLightning(vViewPosition, newNormal);

  gl_FragColor = finalColor * lightning;
}