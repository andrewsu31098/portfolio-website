import * as THREE from "three";
import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Stage } from "@react-three/drei";
import styles from "./MyCanvas.module.scss";
import MyTess from "../Tesselations/MyTess";
import Airplane from "../Tesselations/Airplane";
import Filters from "../Filters/Filters";
import Hand from "../Tesselations/Hand";
import Gear from "../Gear/Gear";
import Overlay from "../../sections/overlay/Overlay";
import Polygon from "../Tesselations/Polygon";

// Hand is disintegrated and forms on user load.
// Pieces should fly from f.o.v into the hand in a spiral pattern.
// Extra credit, pieces should fly in from bottom to top.
// Name and navbar options should appear above the hand, clearly legible and matching in design.
// Website should develop and establish design elements on the corners and/or on the background on design.
// Extra credit. Perhaps the background should be a concave sphere with ampitheatre layers type design.
// Extra Credit. On hand formation maybe the background shakes, indicating that it also is made of pieces.
// Extra credit. On background hover, perhaps the polygons should raise.
// Background 3 rings, 2 on the corners, one slighlty askew on the bottom, instanced meshes filled with sphere dots?.
// Hand holds a navbar for projects.
// Something lights up or something cool happens when the hand forms.
// On portfolio click, hand disintegrates and spins out. Camera zooms in and out for dramatic effect.
// Simple minimalistic screen with lines, images of projects, clickable link, and title available for scroll.
// The projects should be allowed to stand for themselves, and not need to compete with the website for attention.
// Contact form should have a plateau form.
const CameraController = () => {
  const { camera, gl } = useThree();
  camera.position.set(0.1, 0, 10);
  // useEffect(() => {
  //   const controls = new OrbitControls(camera, gl.domElement);

  //   controls.minDistance = 3;
  //   controls.maxDistance = 20;
  //   return () => {
  //     controls.dispose();
  //   };
  // }, [camera, gl]);

  return null;
};

const BackgroundClear = () => {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor("#000000", 0);
  }, [gl]);
  return null;
};

function clickMe(event) {
  console.log(event);
}

function MyCanvas(props) {
  return (
    <div className={styles.Canvas}>
      <Overlay />
      <Canvas>
        <fog attach="fog" near={6} far={6} color="#505050" />
        <BackgroundClear />
        <CameraController />
        <Airplane />
        <spotLight args={["#00000"]} />
        <hemisphereLight color="#F5F5F5" groundColor="#595959" />
      </Canvas>
    </div>
  );
}

export default MyCanvas;
