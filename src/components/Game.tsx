import { Container, Sprite, Text } from "@pixi/react";
import Yaho from "@/assets/yaho.png";
import Chyuru from "@/assets/chyuru.png";
import { GameMap } from "@/state/game-map";
import { Character } from "@/state/character";
import { useKeyBoardEvent } from "@/hooks/use-key-board-event";
import { useRef, useState } from "react";
import { Sprite as PixiSprite, TextStyle } from "pixi.js";
import { AnimationManager } from "@/state/animation";
import { Config } from "@/state/config";
import { Goal } from "@/state/goal";

const animationManager = new AnimationManager();

const gameMap = new GameMap({
  row: 5,
  column: 5,
  width: Config.screenWidth,
  height: Config.screenHeight,
});

const goal = new Goal({
  row: 5,
  column: 5,
  resource: Chyuru,
  map: gameMap,
});

const character = new Character({
  row: 1,
  column: 1,
  map: gameMap,
  resource: Yaho,
});

const moveTo = (row: number, column: number) => {
  gameMap.setObject(row, column, character, {
    onComplete() {
      animationManager.onComplete(onKeyboardDown);
    },
  });
};

function onKeyboardDown(event: KeyboardEvent) {
  if (animationManager.active) {
    animationManager.queue.push({ event });

    return;
  }

  const { sprite, row, column } = character;

  if (!sprite) {
    return;
  }

  animationManager.active = true;

  switch (event.key) {
    case "ArrowLeft":
      moveTo(row - 1, column);
      break;
    case "ArrowUp":
      moveTo(row, column - 1);
      break;
    case "ArrowRight":
      moveTo(row + 1, column);
      break;
    case "ArrowDown":
      moveTo(row, column + 1);
      break;
    default:
      animationManager.onComplete(onKeyboardDown);
      break;
  }
}

character.onKeyboardDown = onKeyboardDown;

function Game() {
  const [popup, setPopup] = useState(false);
  const goalRef = useRef<PixiSprite>(null);
  const yahoRef = useRef<PixiSprite>(null);

  goal.onReach = () => {
    setPopup(true);
  };

  useKeyBoardEvent((event) => {
    const sprite = yahoRef.current;

    if (sprite) {
      character.sprite = sprite;
      character.onKeyboardDown?.(event);
    }
  });

  return (
    <Container>
      <Sprite
        ref={yahoRef}
        x={character.x}
        y={character.y}
        width={gameMap.cellWidth}
        height={gameMap.cellHeight}
        image={character.resource}
        eventMode="static"
      />
      <Sprite
        ref={goalRef}
        x={goal.x}
        y={goal.y}
        width={gameMap.cellWidth}
        height={gameMap.cellHeight}
        image={goal.resource}
        eventMode="static"
      />
      {popup && (
        <Text
          pointerdown={() => setPopup(false)}
          text="야호는 츄르를 좋아해용"
          style={
            new TextStyle({
              fontFamily: "Arial",
              fontSize: 24,
              fill: "#ffffff",
              align: "center",
            })
          }
          x={Config.screenWidth / 2}
          y={Config.screenHeight / 2}
          anchor={0.5}
          eventMode="static"
        />
      )}
    </Container>
  );
}

export default Game;
