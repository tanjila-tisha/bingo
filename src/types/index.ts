export interface Square {
  value: number;
  isDrawn: boolean;
}

export interface Line {
  [key: string]: number;
}

export interface BoardInfo {
  board: Array<Array<Square>>;
  line: Line;
}
