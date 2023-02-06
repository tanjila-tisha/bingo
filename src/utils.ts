import { BoardInfo, Line, Square } from "./types";

const getConditions = (dimention: number): Array<Array<number>> => {
  const conditions = [];
  let initial = 0;
  const interval = 15;

  for (var column = 0; column < dimention; column++) {
    conditions.push([initial + 1, initial + interval]);
    initial += interval;
  }
  return conditions;
};

export const getCenter = (dimention: number) => Math.floor(dimention / 2);

export const generateRandomInteger = (min: number, max: number): number => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const newBoard = (dimention: number): BoardInfo => {
  const board: Array<Array<Square>> = [];
  const line: Line = {};

  const conditions = getConditions(dimention);
  const center = getCenter(dimention);

  for (var i = 0; i < dimention; i++) {
    const rows = [];
    for (var j = 0; j < dimention; j++) {
      const square = {
        value: generateRandomInteger(conditions[j][0], conditions[j][1]),
        isDrawn: i === center && j === center ? true : false,
      };
      rows.push(square);
    }
    line[`${i}${j}`] = i === center || j === center ? 1 : 0;
    line[`${j}${i}`] = i === center || j === center ? 1 : 0;
    board.push(rows);
  }
  line[`${dimention}${dimention}`] = 1;
  line[`${-1}${-1}`] = 1;
  return { board, line };
};

export const checkBoard = (
  board: Array<Array<Square>>,
  line: Line,
  number: number
) => {
  const dimention = board.length;
  const center = getCenter(dimention);
  let isGameOver = false;
  for (var i = 0; i < dimention; i++) {
    for (var j = 0; j < dimention; j++) {
      if (!board[i][j].isDrawn && board[i][j].value === number) {
        // if center of board, which is already marked do nothing.
        if (i === center && j === center) continue;

        // If same index
        if (i === j) {
          line[`${dimention}${dimention}`] += 1;
        }

        board[i][j].isDrawn = true;
        line[`${i}${dimention}`] += 1;
        line[`${dimention}${j}`] += 1;

        //reserve diagonal check for 5*5
        if (
          (i === 0 && j === dimention - 1) ||
          (i === dimention - 1 && j === 0) ||
          (i === dimention - center && j === 1) ||
          (j === dimention - center && i === 1)
        ) {
          line[`${-1}${-1}`] += 1;
        }

        // checking possible line counter
        if (
          line[`${i}${dimention}`] === dimention ||
          line[`${dimention}${j}`] === dimention ||
          line[`${dimention}${dimention}`] === dimention ||
          line[`${-1}${-1}`] === dimention
        ) {
          isGameOver = true;
          break;
        }
      }
    }
  }
  return {
    isGameOver,
    board,
    line,
  };
};
