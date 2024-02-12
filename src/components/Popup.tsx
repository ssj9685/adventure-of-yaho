import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

function Popup(props: { onClose: () => void }) {
  const { onClose } = props;

  return (
    <Text
      pointerdown={onClose}
      text="게임 팝업창 예시"
      style={
        new TextStyle({
          fontFamily: "Arial",
          fontSize: 24,
          fill: "#ffffff",
          align: "center",
        })
      }
      x={200}
      y={150}
      anchor={0.5}
    />
  );
}

export default Popup;
