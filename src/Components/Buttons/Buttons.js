import SoundButton from "./SoundButton";
import ConfigButton from "./ConfigButton";

export default function Buttons({ onToggleSound, onChangeCfg }) {
  return (
    <>
      <SoundButton onToggleSound={onToggleSound} />
      <ConfigButton onClick={onChangeCfg} cfg={1} xPos={-4.5} />
      <ConfigButton onClick={onChangeCfg} cfg={2} xPos={-1.5} />
      <ConfigButton onClick={onChangeCfg} cfg={3} xPos={1.5} />
      <ConfigButton onClick={onChangeCfg} cfg={4} xPos={4.5} />
      <ConfigButton onClick={onChangeCfg} cfg={5} xPos={7.5} />
    </>
  );
}
