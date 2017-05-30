#version 430 core

uniform vec3 objectColor;
uniform vec3 lightDir;
uniform sampler2D texture;

in vec3 interpNormal;
in vec3 vertexTexNew;

void main()
{
	vec3 normal = normalize(interpNormal);
	float diffuse = max(dot(normal, -lightDir), 0.0);
	//gl_FragColor = vec4(objectColor * diffuse, 1.0);
	
	vec3 textureColor;
	
	if(sin(vertexTexNew.y*40) > 0 ){
		textureColor = vec3(0.0,0.0,0.0);
	}else{
		
		textureColor = vec3(1.0,1.0,1.0);
	}
	
	
	gl_FragColor = vec4(textureColor * diffuse, 1.0);
}
