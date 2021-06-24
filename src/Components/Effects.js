// import {
//   EffectComposer,
//   DepthOfField,
//   Bloom,
//   Noise,
//   Vignette,
// } from "@react-three/postprocessing";

// export default function Effects() {
//   return (
//     <EffectComposer>
//       <Bloom
//         intensity={1.5}
//         luminanceThreshold={0.5}
//         luminanceSmoothing={0.025}
//         height={1200}
//       />
//     </EffectComposer>
//   );
// }
import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass });

export default function Effects() {
  const composer = useRef();
  const { scene, gl, size, camera } = useThree();
  const [aspect] = React.useState(() => new THREE.Vector2(512, 512));
  useEffect(
    () => void composer.current.setSize(size.width, size.height),
    [size]
  );
  useFrame(() => composer.current.render(), 1);

  const bloom = {
    resolution: aspect,
    strength: 0.6,
    radius: 0.2,
    threshold: 0,
  };

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />

      <unrealBloomPass
        attachArray="passes"
        args={[bloom.resolution, bloom.strength, bloom.radius, bloom.threshold]}
      />
      <shaderPass
        attachArray="passes"
        args={[FXAAShader]}
        material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
        renderToScreen
      />
    </effectComposer>
  );
}
