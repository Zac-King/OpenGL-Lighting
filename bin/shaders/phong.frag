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

void main() 
{
	vec3 N = normalize(vNormal.xyz);
	vec3 L = normalize(lightDirection);	//-lightDirection - vPosition.xyz
	

	//Diffuse Term
	float diffuseTerm = max(0.0f, dot(N, L));

	//L = normalize(-lightDirection - vPosition.xyz);

	//Specular Term
	vec3 vertToEye	= normalize(cameraPosition + vPosition.xyz);
	vec3 halfWay	= normalize(vertToEye + (L - N));
	float specularTerm	= max(0.0f, dot(halfWay, N));					

	if(diffuseTerm <= 0)
	{
		specularTerm = diffuseTerm;
	}

	// All the lights
	vec3 diffuse = Kd * Id * diffuseTerm;
	vec3 ambient = Ka * Ia;
	vec3 specular = Ks * Is * pow(specularTerm, specularPower);
	
	

	//diffuse  = vec3(0);
	//ambient  = vec3(0);
	//specular = vec3(0);

	FragColour = vec4( diffuse + ambient + specular, 1);
}