import { useEffect, useState } from "react";
import SoundButton from "./SoundButton";
import QualityButton from "./QualityButton";
import ConfigButton from "./ConfigButton";
import { buttonsData } from "./buttonsData";

export default function Buttons({
  onToggleSound,
  onChangeCfg,
  config,
  quality,
  setQuality,
}) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <>
      <SoundButton setHovered={setHovered} onToggleSound={onToggleSound} />
      <QualityButton
        setHovered={setHovered}
        quality={quality}
        setQuality={setQuality}
      />
      {buttonsData.map((button, index) => (
        <ConfigButton
          key={index}
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
