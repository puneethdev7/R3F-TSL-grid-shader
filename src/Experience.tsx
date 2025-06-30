// Correct imports
import { OrbitControls } from "@react-three/drei";
import { useMemo, useState } from "react";
import * as THREE from "three/webgpu";
import { gridMaterial } from "./materials/grid";
import { gridPlus } from "./materials/gridPlus";
import { colorize } from "./materials/colorize";
import { DebugPane, type DebugParams } from "./components/DebugPane";

function Experience() {
  const [params, setParams] = useState<DebugParams>({
    frequency: 50.0,
    lineWidth: 1.0,
    plusGrid: 10.0,
    plusThickness: 0.13,
    plusSpacing: 2.0,
    plusSize: 0.15,
    baseColor: "#13152c",
    gridColor: "#ffffff",
    plusColor: "#000db3",
    fogNear: 3,
    fogFar: 10.0,
    fogColor: "#000000",
  });
  
  const {
    frequency,
    lineWidth,
    plusGrid,
    plusThickness,
    plusSpacing,
    plusSize,
    baseColor,
    gridColor,
    plusColor,
    fogColor,
    fogNear,
    fogFar,
  } = params;
  
  const gridNode = useMemo(
    () => gridMaterial(frequency, lineWidth),
    [frequency, lineWidth]
  );
  
  const plusNode = useMemo(
    () => gridPlus(frequency, plusGrid, plusThickness, plusSpacing, plusSize),
    [frequency, plusGrid, plusThickness, plusSpacing, plusSize]
  );
  
  const colorNode = useMemo(
    () => colorize(gridNode, plusNode, gridColor, plusColor, fogColor, fogNear, fogFar, baseColor),
    [baseColor, gridNode, plusNode, gridColor, plusColor, fogColor, fogNear, fogFar]
  );
  
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardNodeMaterial();
    mat.colorNode = colorNode;
    return mat;
  }, [colorNode]);

  return (
    <>
    <DebugPane params={params} setParams={setParams} />
      <OrbitControls target={[0, 0, 0]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 3, 3]} intensity={1.0} />
      <mesh
        material={material}
        rotation={[-Math.PI * 0.5, 0, 0]}
        position-y={-0.2}
      >
        <planeGeometry args={[50, 50]} />
      </mesh>
    </>
  );
}

export default Experience;
