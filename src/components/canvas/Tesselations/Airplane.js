import { useGLTF } from "@react-three/drei";
import { TessellateModifier } from "three/addons/modifiers/TessellateModifier.js";
import GUI from "lil-gui";
import * as TWEEN from "@tweenjs/tween.js";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  desktopQuery,
  laptopQuery,
  mobileQuery,
} from "../../../utilities/breakpoints";
import { useMediaQuery } from "react-responsive";

export default function Airplane(props) {
  const isDesktop = useMediaQuery({ query: desktopQuery });
  const isLaptop = useMediaQuery({ query: laptopQuery });
  const isMobile = useMediaQuery({ query: mobileQuery });

  //SETUP
  function firstFly(curx, cury) {
    var tmpTween = new TWEEN.Tween({ rz: mesh.current.rotation.z })
      .to({ rz: 2.5 }, 500)
      .easing(TWEEN.Easing.Linear.None)

      .onUpdate((coords) => {
        mesh.current.rotation.z = coords.rz;
      })
      .onComplete(function () {
        noiseFly(2.5, 2.2, 3.1);
        heightFly(catCurve.getPointAt(1).x, catCurve.getPointAt(1).y);
      });
    tmpTween.start();
  }
  function noiseFly(prev, min, max) {
    var next = Math.random() * (max - min) + min;
    var tmpTween = new TWEEN.Tween({ rz: prev })
      .to({ rz: next }, 500)
      .easing(TWEEN.Easing.Quadratic.Out)

      .onUpdate((coords) => {
        mesh.current.rotation.z = coords.rz;
      })
      .onComplete(function () {
        noiseFly(next, 2.2, 3.1);
      });
    tmpTween.start();
  }

  function heightFly(curx, cury) {
    var randx = catCurve.getPointAt(1).x + 0.05 * (Math.random() - 0.5);
    var randy = catCurve.getPointAt(1).y + 0.05 * (Math.random() - 0.5);

    var heightTween = new TWEEN.Tween({ x: curx, y: cury })
      .to({ x: randx, y: randy }, 600)
      .easing(TWEEN.Easing.Quadratic.Out)

      .onUpdate((coords) => {
        mesh.current.position.x = coords.x;
        mesh.current.position.y = coords.y;
      })
      .onComplete(function () {
        heightFly(randx, randy);
      });
    heightTween.start();
  }

  const { nodes, materials } = useGLTF("paper_airplane/scene.gltf");

  const mesh = useRef(null);

  const tessellateModifier = new TessellateModifier(10, 8);

  let planeGeo = new THREE.PlaneGeometry(2, 2, 8, 6);
  planeGeo = tessellateModifier.modify(planeGeo);

  // GUI
  const myObject = { t: 0, zRotate: Math.PI };
  // const gui = new GUI();
  // useEffect(() => {
  //   if (mesh.current) {
  //     gui.add(myObject, "t", 0, 1);
  //     gui.add(myObject, "zRotate", 0, 2 * Math.PI);
  //   }
  // }, [mesh]);

  // TWEEN Animation Control

  useEffect(() => {
    const startTween = new TWEEN.Tween({ t: 0 })
      .to({ t: 0.5 }, 1500)
      .onUpdate((coords) => {
        myObject.t = coords.t;
      })
      .delay(2000);

    const loop1Tween = new TWEEN.Tween({ t: 0.5 })
      .to({ t: 0.8 }, 4000)
      .onUpdate((coords) => {
        myObject.t = coords.t;
        if (myObject.t >= 0.7) {
          loop1Tween.stop();
          loop2Tween.start();
        }
      })
      .easing(TWEEN.Easing.Exponential.Out);

    const loop2Tween = new TWEEN.Tween({ t: 0.7 })
      .to({ t: 0.9 }, 750)
      .onUpdate((coords) => {
        myObject.t = coords.t;
      });

    const endTween = new TWEEN.Tween({ t: 0.9 })
      .to({ t: 1.0 }, 1000)
      .onUpdate((coords) => {
        myObject.t = coords.t;
      })
      .easing(TWEEN.Easing.Quadratic.Out)
      .onComplete(() =>
        firstFly(mesh.current.position.x, mesh.current.position.y)
      );

    startTween.chain(loop1Tween);
    loop2Tween.chain(endTween);
    startTween.start();
  }, []);

  // Responsive Plane End Position
  var finalVector = new THREE.Vector3(0.5, -0.2, 9.2);
  if (isDesktop) {
    finalVector = new THREE.Vector3(0.3, -0.2, 9.2);
  }
  if (isLaptop) {
    finalVector = new THREE.Vector3(0.3, -0.2, 9.2);
  }
  if (isMobile) {
    finalVector = new THREE.Vector3(0.2, -0.2, 9.2);
  }

  // CURVE TEST
  const catCurve = new THREE.CatmullRomCurve3([
    // Left shift 5 x
    new THREE.Vector3(5, 5, 0),
    new THREE.Vector3(-0.5, -0.5, 9),
    new THREE.Vector3(0.5, 0.5, 9.2),
    new THREE.Vector3(1.3, 1.3, 8.4),

    new THREE.Vector3(1, 1.4, 7),
    new THREE.Vector3(0, 0.4, 7),
    finalVector,
  ]);

  const points = catCurve.getPoints(50);
  const curveGeometry = new THREE.BufferGeometry().setFromPoints(points);

  const curveMaterial = new THREE.LineBasicMaterial({
    color: 0xff0000,
    opacity: 0,
    transparent: true,
    linecap: "butt",
  });
  // CURVE TEST

  // Using sphere. Change all planeGeo to sphereGeo
  let sphereGeo = new THREE.SphereGeometry(1, 10, 8, 0);
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
      colors[index + 3 * i] = 0.1;
      colors[index + 3 * i + 1] = 0.1;
      colors[index + 3 * i + 2] = 0.1;

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

    gl_FragColor = vec4( ( directional + ambient ) * vColor, 1.0 );

}
`;

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertilla,
    fragmentShader: fraglon,
    side: THREE.DoubleSide,
    transparent: true,
  });

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const looptime = 20;
    // const t = ((time + 0.5) % looptime) / looptime;
    // const t2 = ((time - 0.1) % looptime) / looptime;
    // const pos = catCurve.getPointAt(t);
    // const pos2 = catCurve.getPointAt(t2 < 0 ? 0 : t2);

    // Comment in for path debugging.
    const pos = catCurve.getPointAt(myObject.t);
    const t2 = myObject.t - 0.01;
    const pos2 = catCurve.getPointAt(t2 < 0 ? 0 : t2);

    mesh.current.position.copy(pos);
    mesh.current.lookAt(pos2);

    mesh.current.rotation.z = myObject.zRotate;
    TWEEN.update();
  });

  function logme() {
    console.log("It worked");
  }
  return (
    <group>
      {/* <axesHelper args={[10, 10, 10]} /> */}
      <line material={curveMaterial} geometry={curveGeometry}></line>
      <mesh
        onClick={() => logme()}
        ref={mesh}
        geometry={nodes.Object_4.geometry}
        material={materials.papier}
      />
    </group>
  );
}
