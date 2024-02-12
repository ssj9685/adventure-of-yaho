import { GameObject, GameObjectParams } from "./object";

export class Goal extends GameObject {
  onReach;

  constructor(
    params: GameObjectParams & {
      onReach?: () => void;
    }
  ) {
    super(params);

    this.onReach = params.onReach;
  }
}
