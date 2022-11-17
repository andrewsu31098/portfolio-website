import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import styles from "./MyCanvas.module.scss";
import Airplane from "../Tesselations/Airplane";
import Overlay from "../../sections/overlay/Overlay";

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

function MyCanvas(props) {
  return (
    <div className={styles.Canvas} id="home">
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
