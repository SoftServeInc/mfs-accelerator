import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const UserModal = ({ onClose, isOpen, onSubmit }) => {
  const [age, setAge] = useState(0);
  const [name, setName] = useState("");

  const onSubmitCallback = () => onSubmit({ age, name });
  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add user</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter user's name and age</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="User name"
          fullWidth
          required
          onChange={(event) => setName(event.target.value)}
          autoComplete="off"
        />
        <TextField
          margin="dense"
          id="age"
          label="Age"
          fullWidth
          type="number"
          autoComplete="off"
          onChange={(event) => setAge(parseInt(event.target.value, 10))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSubmitCallback} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
