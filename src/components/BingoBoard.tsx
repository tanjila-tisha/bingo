import {
  Box,
  Button,
  Card,
  CardContent,
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
  getLine,
  isGameOver,
  resetGame,
} from "../features/bingo/bingoSlice";
import { AppDispatch } from "../store";
import { getCenter } from "../utils";

const BingoBoard = () => {
  const [showStats, setShowStats] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const board = useSelector(getBoard);
  const currentGame = useSelector(getCurrentGame);
  const line = useSelector(getLine);
  console.log("line", line);
  const dimention = useSelector(getDimention);
  const isOver = useSelector(isGameOver);
  const center = getCenter(dimention);

  const history = useSelector(getHistory);

  console.log("history", history);

  useEffect(() => {
    dispatch(createBoard());
  }, []);

  return (
    <Grid>
      <Box
        sx={{
          marginTop: 10,
        }}
      >
        {isOver && (
          <Box
            sx={{
              margin: 5,
            }}
          >
            <Typography variant="h3">Hurre BINGO: GAME OVER!!!!</Typography>
          </Box>
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

        <Box sx={{ margin: 5 }}>
          <Button
            variant="contained"
            onClick={() => dispatch(drawNumber())}
            disabled={isOver}
          >
            {!isOver ? "Draw Number" : "GAME OVER"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => dispatch(resetGame())}
            sx={{ margin: 5 }}
          >
            New game
          </Button>
          <Button
            variant="outlined"
            onClick={() => setShowStats(!showStats)}
            sx={{ margin: 5 }}
          >
            {showStats ? "Hide Stats" : "Show Stats"}
          </Button>
        </Box>
      </Box>
      {currentGame && (
        <Card sx={{ minWidth: 500, padding: 5, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h4">Drawn number:</Typography>
            <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
              {currentGame}
            </Typography>
          </CardContent>
        </Card>
      )}
      {showStats &&
        history.slice(0, history.length - 2).map((item, index) => {
          return (
            <Card sx={{ minWidth: 500, padding: 5, textAlign: "center" }}>
              <CardContent>
                <Typography variant="h4">Game {index + 1}:</Typography>
                <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
                  {item.join(",")}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
    </Grid>
  );
};

export default BingoBoard;
