import react, { useState } from "react";
import { useSelector } from "react-redux";
import { getPlayerName } from "../features/bingo/bingoSlice";
import UserName from "./UserName";
import BingoBoard from "./BingoBoard";
import { AppBar, Container, Typography } from "@mui/material";

const HomePage = () => {
  const [open, setOpen] = useState(true);
  const player = useSelector(getPlayerName);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          {player.length ? (
            <Typography variant="h6" noWrap component="a">
              {player}'s bingo Board
            </Typography>
          ) : (
            <Typography variant="h6" noWrap component="a">
              Bingo Board
            </Typography>
          )}
        </Container>
      </AppBar>

      {!player.length ? (
        <BingoBoard />
      ) : (
        <UserName open={open} setOpen={setOpen} />
      )}
    </>
  );
};

export default HomePage;
