#version 430 core

layout(location = 0) in vec3 vertexPosition;
layout(location = 1) in vec2 vertexTexCoord;
layout(location = 2) in vec3 vertexNormal;

uniform mat4 modelViewProjectionMatrix;

out vec3 fragVert;
out vec3 fragNormal;
out vec2 fragTexCoord;

void main()
{
	gl_Position = modelViewProjectionMatrix * vec4(vertexPosition, 1.0);
	fragTexCoord = vertexTexCoord;
	fragNormal = vertexNormal;
	fragVert = vertexPosition;
}