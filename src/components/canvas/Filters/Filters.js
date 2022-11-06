import { Effects } from "@react-three/drei";
import { UnrealBloomPass, GlitchPass } from "three-stdlib";
import { extend } from "@react-three/fiber";

extend({ UnrealBloomPass });

function Filters(props) {
  return (
    <Effects>
      <unrealBloomPass threshold={0.0} strength={1} radius={0.2} />
    </Effects>
  );
}

export default Filters;
