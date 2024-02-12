import { GameMap } from "./game-map";

export interface GameObjectParams {
  row: number;
  column: number;
  resource: string | HTMLImageElement;
  map: GameMap;
}

export class GameObject {
  x;
  y;
  map;
  row;
  column;
  resource;
  initialRow;
  initialColumn;

  constructor(params: GameObjectParams) {
    const { row, column, resource, map } = params;
    this.map = map;
    this.initialRow = row;
    this.initialColumn = column;
    this.row = row;
    this.column = column;
    this.resource = resource;
    this.x = (row - 1) * map.cellWidth;
    this.y = (column - 1) * map.cellHeight;

    this.map.setObject(row, column, this);
  }

  setPos(row: number, column: number) {
    this.row = row;
    this.column = column;
    this.setOffset(row, column);
  }

  setOffset(row: number, column: number) {
    this.x = (row - 1) * this.map.cellWidth;
    this.y = (column - 1) * this.map.cellHeight;
  }
}
