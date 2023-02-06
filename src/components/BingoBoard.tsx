import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBoard,
  drawNumber,
  getBoard,
  getCurrentGame,
  getDimention,
  getHistory,
  isGameOver,
  resetGame,
} from "../features/bingo/bingoSlice";
import { AppDispatch } from "../store";
import { getCenter } from "../utils";
import DisplayCard from "./DisplayCard";

const BingoBoard = () => {
  const [showStats, setShowStats] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const board = useSelector(getBoard);
  const currentGame = useSelector(getCurrentGame);
  const dimention = useSelector(getDimention);
  const isOver = useSelector(isGameOver);
  const center = getCenter(dimention);
  const history = useSelector(getHistory);

  useEffect(() => {
    dispatch(createBoard());
  }, [dispatch]);

  return (
    <>
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ marginTop: 10 }}>
          {isOver && (
            <Typography variant="h3" sx={{ marginBottom: 5 }}>
              Hurre BINGO: GAME OVER!!!!
            </Typography>
          )}
          <TableContainer component={Paper} sx={{ maxWidth: 500 }}>
            <Table>
              <TableHead>
                <TableRow
                  className="table-header"
                  sx={{ backgroundColor: "black", color: "white" }}
                >
                  <TableCell align="center" className="table-header-column">
                    B
                  </TableCell>
                  <TableCell align="center" className="table-header-column">
                    I
                  </TableCell>
                  <TableCell align="center" className="table-header-column">
                    N
                  </TableCell>
                  <TableCell align="center" className="table-header-column">
                    G
                  </TableCell>
                  <TableCell align="center" className="table-header-column">
                    O
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {board.map((col, colIndex) => (
                  <TableRow key={`col-${colIndex}`}>
                    {col.map((row, rowIndex) => (
                      <TableCell
                        align="center"
                        key={`row-${rowIndex}`}
                        className={row.isDrawn ? "drawn" : "square"}
                      >
                        {colIndex === center && rowIndex === center
                          ? "FREE"
                          : row.value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{ display: "flex", justifyContent: "space-around", margin: 5 }}
          >
            <Button
              variant="outlined"
              onClick={() => dispatch(drawNumber())}
              disabled={isOver}
            >
              {!isOver ? "Draw Number" : "GAME OVER"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => dispatch(resetGame())}
              sx={{ marginLeft: 5 }}
            >
              New game
            </Button>
            {!!history.length && (
              <Button
                variant="outlined"
                onClick={() => setShowStats(!showStats)}
                sx={{ marginLeft: 5 }}
              >
                {showStats ? "Hide Stats" : "Show Stats"}
              </Button>
            )}
          </Box>
        </Box>
      </Grid>
      {currentGame && <DisplayCard item={currentGame} title="Drawn number" />}
      {showStats && (
        <Box sx={{ marginTop: 5 }}>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            History
          </Typography>
          {history.map((item, index) => (
            <DisplayCard item={item.join(",")} title={`Game ${index + 1}`} />
          ))}
        </Box>
      )}
    </>
  );
};

export default BingoBoard;
