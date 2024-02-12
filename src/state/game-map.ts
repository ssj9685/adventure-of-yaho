import gsap from "gsap";
import { Goal } from "./goal";
import { GameObject } from "./object";
import { Character } from "./character";

export class GameMap {
  row;
  column;
  cellWidth;
  cellHeight;
  list: (GameObject[] | undefined)[] = [];

  constructor(params: {
    row: number;
    column: number;
    width: number;
    height: number;
  }) {
    const { row, column, width, height } = params;
    this.row = row;
    this.column = column;

    this.cellWidth = width / column;
    this.cellHeight = height / row;
  }

  private getIndex(row: number, column: number) {
    return this.row * (row - 1) + column;
  }

  getObject(row: number, column: number) {
    const index = this.getIndex(row, column);

    return this.list[index];
  }

  // fixme: 코드 리팩토링이 절실
  setObject<T extends GameObject>(
    row: number,
    column: number,
    object: T,
    options?: {
      onComplete: () => void;
    }
  ) {
    if (column === 0 || row === 0 || column > this.row || row > this.column) {
      options?.onComplete();

      return;
    }

    const prevIndex = this.getIndex(object.row, object.column);
    const index = this.getIndex(row, column);
    const inital = index === prevIndex;
    const nextObject = this.list[index] ?? [];
    const [goalObject] = nextObject.filter((obj) => obj instanceof Goal);

    (goalObject as Goal)?.onReach?.();

    object.setPos(row, column);

    if (this.list[index] === undefined) {
      this.list[index] = [];
    }

    this.list[index]?.push(object);

    if (object instanceof Character && object.sprite) {
      gsap.to(object.sprite, {
        x: object.x,
        y: object.y,
        onComplete: options?.onComplete,
      });
    }

    if (!inital) {
      const prevObject = this.list[prevIndex]?.findIndex((obj) => {
        obj === object;
      });

      if (!prevObject) {
        return;
      }

      this.list[prevIndex]?.splice(prevObject, 1);
    }
  }
}
