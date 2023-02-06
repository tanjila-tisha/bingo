import { useState } from "react";
import { useSelector } from "react-redux";
import { getPlayerName } from "../features/bingo/bingoSlice";
import UserName from "./UserName";
import BingoBoard from "./BingoBoard";
import { Box, Typography } from "@mui/material";

const HomePage = () => {
  const [open, setOpen] = useState(true);
  const player = useSelector(getPlayerName);

  return (
    <>
      <Box sx={{ textAlign: "center", marginTop: 5 }}>
        {player.length ? (
          <Typography variant="h2" noWrap component="a">
            Hello {player}
          </Typography>
        ) : (
          <Typography variant="h2" noWrap component="a">
            Bingo Board
          </Typography>
        )}
      </Box>

      {player.length ? (
        <BingoBoard />
      ) : (
        <UserName open={open} setOpen={setOpen} />
      )}
    </>
  );
};

export default HomePage;
