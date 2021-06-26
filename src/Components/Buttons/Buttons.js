import SoundButton from "./SoundButton";
import ConfigButton from "./ConfigButton";
import { useEffect, useState } from "react";

export default function Buttons({ onToggleSound, onChangeCfg }) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <>
      <SoundButton setHovered={setHovered} onToggleSound={onToggleSound} />
      <ConfigButton
        setHovered={setHovered}
        onClick={onChangeCfg}
        cfg={1}
        xPos={-4.5}
      />
      <ConfigButton
        setHovered={setHovered}
        onClick={onChangeCfg}
        cfg={2}
        xPos={-1.5}
      />
      <ConfigButton
        setHovered={setHovered}
        onClick={onChangeCfg}
        cfg={3}
        xPos={1.5}
      />
      <ConfigButton
        setHovered={setHovered}
        onClick={onChangeCfg}
        cfg={4}
        xPos={4.5}
      />
      <ConfigButton
        setHovered={setHovered}
        onClick={onChangeCfg}
        cfg={5}
        xPos={7.5}
      />
    </>
  );
}
