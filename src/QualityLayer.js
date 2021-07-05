import { useCallback, useState } from "react";
import App from "./App";
import QualitySelect from "./Components/QualitySelect/QualitySelect";
export default function QualityLayer() {
  const [quality, setQuality] = useState(
    +localStorage.getItem("quality") ?? false
  );
  const onChangeQuality = useCallback((value) => {
    setQuality(value);
    localStorage.setItem("quality", value);
  }, []);
  return (
    <>
      {quality ? (
        <App quality={quality} setQuality={onChangeQuality} />
      ) : (
        <QualitySelect setQuality={onChangeQuality} />
      )}
    </>
  );
}
