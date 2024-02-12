import { GameObject, GameObjectParams } from "./object";
import { Sprite } from "pixi.js";

export class Character extends GameObject {
  sprite?: Sprite;
  onKeyboardDown?: (event: KeyboardEvent) => void;

  constructor(params: GameObjectParams) {
    super(params);
  }
}
