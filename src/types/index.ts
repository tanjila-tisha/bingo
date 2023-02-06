export interface Square {
  value: number;
  isDrawn: boolean;
}

export interface DecisionLine {
  [key: string]: number;
}

export interface BoardInfo {
  board: Array<Array<Square>>;
  decisionLines: DecisionLine;
}
