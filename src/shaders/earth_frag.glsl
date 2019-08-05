#extension GL_OES_standard_derivatives : enable

varying vec3 vWorldPosition;
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

vec4 computeLighting(vec3 vViewPosition, vec3 newNormal) 
{
    float Kd;
    float Ka = 5.;

    for (int l = 0; l < NUM_POINT_LIGHTS; l++) {
        // Will be used for attenuation.
        float lightDistance = length(pointLights[l].position -  vViewPosition);
        vec3 lightDirection = normalize(pointLights[l].position -  vViewPosition);

        // Lambertian reflection 
        Kd = max(dot(newNormal, lightDirection), 0.0);

        // Add attenuation.
        Kd = Kd * (1.0 / (1.0 + (0.25 * lightDistance * lightDistance)));
    }

    vec3 diffuseLighting = pointLights[0].color * Kd;
    vec3 ambientLighting = vec3(1., 1., 1.) * Ka;
    return vec4(ambientLighting + diffuseLighting, 1.0) * 0.2;
}

vec3 fIslandColor(vec3 pos, vec3 newNormal){
  vec3 lightDirection = normalize(lightPos -  vViewPosition);

  float diffuse = max(0., dot(lightDirection, newNormal));
  diffuse += smoothstep(80., 0., abs(pos.y)) * 0.02;

  return mix(vec3(.588, .47, .2745) * 1.5, vec3(.1, .7, .1), smoothstep(0., 18., pos.y))*diffuse;
}
void main() {
  vec3 newNormal = normalize(cross( dFdx( vViewPosition ), dFdy( vViewPosition ) ));

  vec4 color;
  color = vec4(fIslandColor(vWorldPosition, newNormal),1.);

  vec4 lightning = computeLighting(vViewPosition, newNormal);
  gl_FragColor = color * lightning;
}