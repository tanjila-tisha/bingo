import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { checkBoard, generateRandomInteger, newBoard } from "../../utils";
import { DecisionLine, Square } from "../../types";

interface BingoState {
  playerName: string;
  dimention: number;
  board: Array<Array<Square>>;
  decisionLines: DecisionLine;
  isGameOver: boolean;
  shots: number;
  history: Array<Array<number>>;
}

const initialState: BingoState = {
  playerName: "",
  dimention: 5,
  board: [],
  decisionLines: {},
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
      const { board, decisionLines } = newBoard(state.dimention);
      state.board = board;
      state.decisionLines = decisionLines;
    },
    resetGame: (state) => {
      const { board, decisionLines } = newBoard(state.dimention);
      state.board = board;
      state.decisionLines = decisionLines;
      state.isGameOver = false;
      state.shots = 0;
    },
    drawNumber: (state) => {
      const number = generateRandomInteger(1, 75);
      const { board, decisionLines, isGameOver } = checkBoard(
        state.board,
        state.decisionLines,
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
      state.decisionLines = decisionLines;
      state.isGameOver = isGameOver;
    },
  },
});

export const { createBoard, setPlayerName, drawNumber, resetGame } =
  bingoSlice.actions;

// Selectors
export const getPlayerName = (state: RootState): string =>
  state.bingo.playerName;

export const getDimention = (state: RootState): number => state.bingo.dimention;

export const getBoard = (state: RootState) => state.bingo.board;

export const getHistory = (state: RootState) => {
  return state.bingo.history.slice(0, state.bingo.history.length - 1);
};
export const isGameOver = (state: RootState): boolean => state.bingo.isGameOver;

export const getCurrentGame = (state: RootState): string | null => {
  const numberOfShots = state.bingo.shots;
  if (!numberOfShots) return null;
  return state.bingo.history[state.bingo.history.length - 1].join(",");
};

export default bingoSlice.reducer;
