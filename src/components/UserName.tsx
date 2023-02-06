import  { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setPlayerName } from "../features/bingo/bingoSlice";

interface UserNameProps {
  open: boolean;
  setOpen: (id: boolean) => void;
}

const UserName = ({ open, setOpen }: UserNameProps) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleStartGame = () => {
    setOpen(false);
    dispatch(setPlayerName(name));
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Player's Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your name to start the game!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStartGame} disabled={name.length < 3}>
            Let's Start
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserName;
