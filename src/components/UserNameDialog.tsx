import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { AppDispatch } from "../store";
import { setPlayerName } from "../features/bingo/bingoSlice";

interface UserNameProps {
  open: boolean;
  setOpen: (id: boolean) => void;
}

const UserNameDialog = ({ open, setOpen }: UserNameProps): JSX.Element => {
  const [name, setName] = useState<string>("");
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

export default UserNameDialog;
