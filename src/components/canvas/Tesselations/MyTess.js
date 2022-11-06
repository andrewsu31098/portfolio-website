import { Edges } from "@react-three/drei";
import { TessellateModifier } from "three/addons/modifiers/TessellateModifier.js";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function MyTess(props) {
  const mesh = useRef(null);

  const tessellateModifier = new TessellateModifier(10, 8);

  let planeGeo = new THREE.PlaneGeometry(2, 2, 8, 6);
  planeGeo = tessellateModifier.modify(planeGeo);

  // Using sphere. Change all planeGeo to sphereGeo
  let sphereGeo = new THREE.SphereGeometry(
    3,
    10,
    8,
    0,
    Math.PI * 2,
    Math.PI / 8,
    Math.PI * 2
  );
  sphereGeo = tessellateModifier.modify(sphereGeo);

  //Using Box, change all geo to BoxGeo
  let boxGeo = new THREE.BoxGeometry(5, 5, 5, 4, 4, 4);
  boxGeo = tessellateModifier.modify(boxGeo);

  const numFaces = sphereGeo.attributes.position.count / 3;
  const colors = new Float32Array(numFaces * 3 * 3);
  const displacement = new Float32Array(numFaces * 3 * 3);
  const faceNormals = new Float32Array(numFaces * 3 * 3);

  for (let f = 0; f < numFaces; f++) {
    const index = 9 * f;

    // Calculate random displacement.
    const d = 10 * (1 - Math.random());

    // Calculate face normal.
    var normalRef = sphereGeo.attributes.normal.array;
    const a = new THREE.Vector3(
      normalRef[index],
      normalRef[index + 1],
      normalRef[index + 2]
    );
    const b = new THREE.Vector3(
      normalRef[index + 3],
      normalRef[index + 4],
      normalRef[index + 5]
    );
    const c = new THREE.Vector3(
      normalRef[index + 6],
      normalRef[index + 7],
      normalRef[index + 8]
    );

    var normalVector = new THREE.Vector3(
      parseFloat(a.x + b.x + c.x),
      parseFloat(a.y + b.y + c.y),
      parseFloat(a.z + b.z + c.z)
    );
    normalVector.divideScalar(3.0);
    normalVector.normalize();

    for (let i = 0; i < 3; i++) {
      colors[index + 3 * i] = 0.12157;
      colors[index + 3 * i + 1] = 0.31765;
      colors[index + 3 * i + 2] = 1.0;

      // Changed to black for testing.
      // colors[index + 3 * i] = 0;
      // colors[index + 3 * i + 1] = 0;
      // colors[index + 3 * i + 2] = 0;

      displacement[index + 3 * i] = d;
      displacement[index + 3 * i + 1] = d;
      displacement[index + 3 * i + 2] = d;

      faceNormals[index + 3 * i] = normalVector.x;
      faceNormals[index + 3 * i + 1] = normalVector.y;
      faceNormals[index + 3 * i + 2] = normalVector.z;
    }
  }

  sphereGeo.setAttribute(
    "displacement",
    new THREE.BufferAttribute(displacement, 3)
  );
  sphereGeo.setAttribute("customColor", new THREE.BufferAttribute(colors, 3));
  sphereGeo.setAttribute(
    "faceNormal",
    new THREE.BufferAttribute(faceNormals, 3)
  );

  let uniforms = {
    amplitude: { value: 0 },
  };

  const vertilla = `
uniform float amplitude;

attribute vec3 customColor;
attribute vec3 displacement;
attribute vec3 faceNormal;

varying vec3 vNormal;
varying vec3 vColor;
varying vec3 vFaceNormal;

void main() {

    vNormal = normal;
    vColor = customColor;
    vFaceNormal = faceNormal;

    vec3 newPosition = position + faceNormal * amplitude ;
    

    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
`;

  const fraglon = `
varying vec3 vNormal;
varying vec3 vColor;

void main() {

    const float ambient = 0.4;

    vec3 light = vec3( 1.0 );
    light = normalize( light );

    float directional = max( dot( vNormal, light ), 0.0 );

    gl_FragColor = vec4( ( directional + ambient ) * vColor, 0.0 );

}
`;

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertilla,
    fragmentShader: fraglon,
    side: THREE.DoubleSide,
    wireframe: true,
    transparent: true,
  });

  function render() {
    // uniforms.amplitude.value += 0.01;
    // if (firstRender) {
    //   console.log(Math.sin(time * 0.5));
    //   console.log(`First Position: ${1.0 + Math.sin(time * 0.5)}`);
    //   firstRender = false;
    // }
    //MAIN START
    // const time = Date.now() * 0.001;
    // uniforms.amplitude.value = 1.0 + Math.sin(time * 0.5);
    mesh.current.rotation.y += 0.001;
    // mesh.current.rotation.x += 0.001;
    //MAIN END
    // if (uniforms.amplitude.value > 0) {
    //   uniforms.amplitude.value -= 0.01;
    // }
  }
  function animate() {
    window.requestAnimationFrame(animate);
    render();
  }
  useEffect(() => animate(), []);

  return (
    <>
      <mesh ref={mesh} geometry={sphereGeo} material={shaderMaterial}></mesh>
    </>
  );
}

export default MyTess;
