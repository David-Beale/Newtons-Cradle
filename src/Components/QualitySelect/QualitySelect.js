import "./QualitySelectStyle.css";
export default function QualitySelect({ setQuality }) {
  return (
    <div className="qsBackground">
      <div className="qsContainer">
        <div className="qsTitle">Select Quality</div>
        <div className="qsButtonsContainer">
          <div className="qsButton" onClick={() => setQuality(1)}>
            Low
          </div>
          <div className="qsButton" onClick={() => setQuality(2)}>
            Medium
          </div>
          <div className="qsButton" onClick={() => setQuality(3)}>
            High
          </div>
        </div>
      </div>
    </div>
  );
}
