// classic Phong equation
#version 410

in vec4 vPosition;
in vec4 vNormal;

uniform vec3 Ka;
uniform vec3 Kd;
uniform vec3 Ks;

uniform float specularPower;

uniform vec3 Ia;
uniform vec3 Id;
uniform vec3 Is;

uniform vec3 lightDirection;

uniform vec3 cameraPosition;

out vec4 FragColour;

void main() {
	vec3 N = normalize(vNormal.xyz);
	vec3 L = normalize(lightDirection);

	// Specular		:: materialSpectular * lightSpectular *((reflectedLight dot viewDirection)to the power of specularPower)
	vec3 VertToEye	= normalize(cameraPosition - vPosition.xyz);
	vec3 HalfWay	= normalize(VertToEye + L);
	float s			= max(0.0f, dot(HalfWay, N));
	vec3 specular	= Is * Ks  * pow(s, specularPower) + vec3(.5,.4,1);

	// Ambient		:: materialAmbient * ambientLight
	vec3 ambient	= Ka * Ia;

	// Diffuse		:: (materialDiffuse * (LightDirection.normalized dot vertNormal.noralized) * lightDiffuse)
	vec3 diffuse	= Kd * (dot(vNormal.xyz, lightDirection)) * Id;

	//ambient		= vec3(1,1,1);
	//diffuse		= vec3(1,1,1);
	//specular	= vec3(1,0,0);
	FragColour	= vec4(ambient + diffuse + specular, 1);
}