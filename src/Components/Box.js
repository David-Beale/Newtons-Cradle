import {
  useBox,
  useCompoundBody,
  useCylinder,
  useHingeConstraint,
  useSphere,
} from "@react-three/cannon";

// export default function Box() {
//   const [ref] = useSphere(() => ({
//     mass: 1,
//     position: [0, -1, 0],
//     rotation: [0, 0, 0],
//     args: [1],
//   }));

//   return (
//     <group ref={ref}>
//       <mesh castShadow>
//         <sphereBufferGeometry args={[1, 16, 16]} />
//         <meshStandardMaterial color="hotpink" />
//       </mesh>
//     </group>
//   );
// }

export default function Box() {
  const [ref] = useBox(() => ({
    mass: 0.001,
    position: [0, -4, 0],
    rotation: [Math.PI / 4, 0, 0],
    args: [1, 1, 1],
  }));

  return (
    <group ref={ref}>
      <mesh castShadow>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </group>
  );
}
