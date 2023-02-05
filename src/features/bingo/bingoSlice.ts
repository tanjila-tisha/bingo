import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { checkBoard, generateRandomInteger, newBoard } from "../../utils";
import { Line, Square } from "../../types";

interface BingoState {
  playerName: string;
  dimention: number;
  board: Array<Array<Square>>;
  line: Line;
  isGameOver: boolean;
  shots: number;
  history: Array<Array<number>>;
}

const initialState: BingoState = {
  playerName: "",
  dimention: 5,
  board: [],
  line: {},
  shots: 0,
  isGameOver: false,
  history: [],
};

export const bingoSlice = createSlice({
  name: "bingo",
  initialState,
  reducers: {
    setPlayerName: (state, action: PayloadAction<string>) => {
      state.playerName = action.payload;
    },
    createBoard: (state) => {
      const { board, line } = newBoard(state.dimention);
      state.board = board;
      state.line = line;
    },
    resetGame: (state) => {
      const { board, line } = newBoard(state.dimention);
      state.board = board;
      state.line = line;
      state.isGameOver = false;
      state.shots = 0;
    },
    drawNumber: (state) => {
      const number = generateRandomInteger(1, 75);
      const { board, line, isGameOver } = checkBoard(
        state.board,
        state.line,
        number
      );
      const numberOfShots = state.shots;
      if (numberOfShots === 0) {
        state.history.push([number]);
      } else {
        state.history[state.history.length - 1].push(number);
      }
      state.shots += 1;
      state.board = board;
      state.line = line;
      state.isGameOver = isGameOver;
    },
  },
});

export const { createBoard, setPlayerName, drawNumber, resetGame } =
  bingoSlice.actions;

export const getPlayerName = (state: RootState) => state.bingo.playerName;
export const getDimention = (state: RootState) => state.bingo.dimention;
export const getBoard = (state: RootState) => state.bingo.board;
export const getHistory = (state: RootState) => state.bingo.history;
export const getLine = (state: RootState) => state.bingo.line;
export const isGameOver = (state: RootState) => state.bingo.isGameOver;
export const getCurrentGame = (state: RootState) => {
  const numberOfShots = state.bingo.shots;
  if (!numberOfShots) return null;
  return state.bingo.history[state.bingo.history.length - 1].join(",");
};

export default bingoSlice.reducer;
