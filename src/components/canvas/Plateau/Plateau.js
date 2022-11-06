import * as THREE from "three";
import { TessellateModifier } from "three/addons/modifiers/TessellateModifier.js";
import { useEffect } from "react";

function Plateau(props) {
  const tessellateModifier = new TessellateModifier(8, 6);

  let planeGeo = new THREE.PlaneGeometry(10, 50, 2, 10);
  planeGeo.position = [0, 5, 0];
  planeGeo = tessellateModifier.modify(planeGeo);

  const numFaces = planeGeo.attributes.position.count / 3;

  const colors = new Float32Array(numFaces * 3 * 3);
  const displacement = new Float32Array(numFaces * 3 * 3);
  const rows = new Int32Array(numFaces * 3 * 3);

  const color = new THREE.Color();
  for (let f = 0; f < numFaces; f++) {
    const index = 9 * f;

    const h = 0.2 * Math.random();
    const s = 0.5 + 0.5 * Math.random();
    const l = 0.5 + 0.5 * Math.random();

    color.setHSL(h, s, l);

    const d = 1 * (1 - Math.random());

    for (let i = 0; i < 3; i++) {
      colors[index + 3 * i] = color.r;
      colors[index + 3 * i + 1] = color.g;
      colors[index + 3 * i + 2] = color.b;

      displacement[index + 3 * i] = d;
      displacement[index + 3 * i + 1] = d;
      displacement[index + 3 * i + 2] = d;

      rows[index + 3 * i] = Math.floor(f / 4);
      rows[index + 3 * i + 1] = Math.floor(f / 4);
      rows[index + 3 * i + 2] = Math.floor(f / 4);
    }
  }

  planeGeo.setAttribute("customColor", new THREE.BufferAttribute(colors, 3));
  planeGeo.setAttribute(
    "displacement",
    new THREE.BufferAttribute(displacement, 3)
  );
  planeGeo.setAttribute("row", new THREE.BufferAttribute(rows, 3));

  let uniforms = {
    amplitude: { value: 0 },
  };

  const vertilla = `
uniform float amplitude;

attribute vec3 customColor;
attribute vec3 displacement;
attribute int row;

varying vec3 vNormal;
varying vec3 vColor;

void main() {

    vNormal = normal;
    vColor = customColor;

  
    // vec3 newPosition = position + normal  * amplitude  * displacement;
    vec3 newPosition = position;

    if(amplitude > float(row)) 
    {
      newPosition =  position -  normal * (amplitude - float(row));
    }

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

    gl_FragColor = vec4( ( directional + ambient ) * vColor, 1.0 );

}
`;

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertilla,
    fragmentShader: fraglon,
    side: THREE.DoubleSide,
  });

  function render() {
    const time = Date.now() * 0.001;
    uniforms.amplitude.value += 0.01;
    // if (firstRender) {
    //   console.log(Math.sin(time * 0.5));
    //   console.log(`First Position: ${1.0 + Math.sin(time * 0.5)}`);
    //   firstRender = false;
    // }

    // uniforms.amplitude.value = 1.0 + Math.sin(time * 0.5);

    // if (uniforms.amplitude.value > 0) {
    //   uniforms.amplitude.value -= 0.01;
    // }
  }
  function animate() {
    window.requestAnimationFrame(animate);
    render();
  }
  useEffect(() => animate(), []);

  //   useFrame(() => {
  //     uniforms.amplitude.value += 0.01;
  //   });
  return (
    <mesh
      rotation={[-Math.PI / 2.1, 0, 0]}
      //
      position={[0, 0, -1]}
      geometry={planeGeo}
      material={shaderMaterial}
      onClick={(e) => console.log(e)}
    >
      <axesHelper args={[2, 2, 2]} />
      {/* <planeBufferGeometry
            geometry={planeGeo}
            args={[50, 50, 30, 30]}
            // ref={geometry}
            attach="geometry"
          />
          <meshPhongMaterial wireframe attach="material" color="black" /> */}
    </mesh>
  );
}

export default Plateau;
