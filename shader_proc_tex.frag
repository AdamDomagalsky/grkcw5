#version 430 core

uniform vec3 objectColor;
uniform vec3 lightDir;
uniform sampler2D texture;
uniform float u_time;

in vec3 interpNormal;
in vec3 vertexTexCord;

// 2D Random
float random (in vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve. 
    vec2 u = f*f*(3.0-2.0*f);

    // Mix 4 coorners porcentages
    return mix(a, b, u.x) + 
            (c - a)* u.y * (1.0 - u.x) + 
            (d - b) * u.x * u.y;
}


void main()
{
	vec3 normal = normalize(interpNormal);
	float diffuse = max(dot(normal, -lightDir), 0.0);
	//gl_FragColor = vec4(objectColor * diffuse, 1.0);
	
	/*vec3 textureColor,x,y,z;
	
	if(sin(vertexTexCord.y*40) > 0 ){
		y = vec3(0.3,0.0,0.0);
	}else{
		y = vec3(0.9,0.0,0.0);
	}
	textureColor = x + y + z;*/
	
	 // some noise in action
    vec2 pos = vec2(vertexTexCord.xy*5.984*u_time);

    // Use the noise function
    float n = noise(pos);

	//gl_FragColor = vec4(textureColor * diffuse, 1.0);
	gl_FragColor = vec4(vec3(n) * diffuse, 1.0);
}
