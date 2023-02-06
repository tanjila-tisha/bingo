import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { getPlayerName } from "../features/bingo/bingoSlice";
import UserNameDialog from "./UserNameDialog";
import BingoBoard from "./BingoBoard";

const HomePage = (): JSX.Element => {
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
        <UserNameDialog open={open} setOpen={setOpen} />
      )}
    </>
  );
};

export default HomePage;
