
#version 430 core

uniform mat4 model;
uniform sampler2D tex;

uniform struct Light {
   vec3 position;
   vec3 intensities; //a.k.a the color of the light
}light1,light2;

in vec2 fragTexCoord;
in vec3 fragNormal;
in vec3 fragVert;


out vec4 finalColor;

void main() {
    //calculate normal in world coordinates
    mat3 normalMatrix = transpose(inverse(mat3(model)));
    vec3 normal = normalize(normalMatrix * fragNormal); 
    //calculate the location of this fragment (pixel) in world coordinates
    vec3 fragPosition = vec3(model * vec4(fragVert, 1));
    
    //calculate the vector from this pixels surface to the light source
    vec3 surfaceToLight1 = -light1.position - fragPosition;
	vec3 surfaceToLight2 = -light2.position - fragPosition;

    //calculate the cosine of the angle of incidence
    float brightness1 = dot(normal, surfaceToLight1) / (length(surfaceToLight1) * length(normal));
    brightness1 = clamp(brightness1, 0, 1);
	
	float brightness2 = dot(normal, surfaceToLight2) / (length(surfaceToLight2) * length(normal));
	brightness2 = clamp(brightness2,0,1);

    //calculate final color of the pixel, based on:
    // 1. The angle of incidence: brightness
    // 2. The col	or/intensities of the light: light.intensities
    // 3. The texture and texture coord: texture(tex, fragTexCoord)
    vec4 surfaceColor = texture(tex, fragTexCoord);
	vec4 finalColor1 = vec4(1.5*brightness1 * light1.intensities * surfaceColor.rgb, surfaceColor.a);
	vec4 finalColor2 = vec4(1.5*brightness2 * light2.intensities * surfaceColor.rgb, surfaceColor.a);
    finalColor = finalColor1 + finalColor2;
	
}