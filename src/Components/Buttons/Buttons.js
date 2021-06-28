import { useEffect, useState } from "react";
import SoundButton from "./SoundButton";
import ConfigButton from "./ConfigButton";
import { buttonsData } from "./buttonsData";

export default function Buttons({ onToggleSound, onChangeCfg, config }) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <>
      <SoundButton setHovered={setHovered} onToggleSound={onToggleSound} />
      {buttonsData.map((button) => (
        <ConfigButton
          setHovered={setHovered}
          disabled={config === button.id}
          onClick={onChangeCfg}
          cfg={button.id}
          xPos={button.xPos}
          yPos={button.yPos}
        />
      ))}
    </>
  );
}
