import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  form: {
    "& > *": {
      margin: "5px",
      width: "90px",
    },
  },
  button: {
    height: "40px",
  },
});
interface Props {
  createFakeRowData: (properties: TableDataProps) => void;
}

const AddDataForm = ({ createFakeRowData }: Props) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [position, setPosition] = useState("");
  const [occupation, setOccupation] = useState("");
  const [location, setLocation] = useState("");

  const clearFormular = () => {
    setName("");
    setSurname("");
    setPosition("");
    setOccupation("");
    setLocation("");
  };

  const handleSubmit = (event: React.SyntheticEvent<EventTarget>) => {
    const properties = {
      name,
      surname,
      position,
      occupation,
      location,
    };
    event.preventDefault();
    createFakeRowData(properties);
    clearFormular();
  };

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Button
        className={classes.button}
        type="submit"
        variant="contained"
        color="primary"
      >
        Add
      </Button>
      <TextField
        margin="dense"
        value={name}
        label="Name"
        fullWidth
        type="string"
        autoComplete="off"
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        margin="dense"
        value={surname}
        label="Surname"
        fullWidth
        type="string"
        autoComplete="off"
        onChange={(event) => setSurname(event.target.value)}
      />
      <TextField
        margin="dense"
        value={position}
        label="Position"
        fullWidth
        type="string"
        autoComplete="off"
        onChange={(event) => setPosition(event.target.value)}
      />
      <TextField
        margin="dense"
        value={occupation}
        label="Occupation"
        fullWidth
        type="string"
        autoComplete="off"
        onChange={(event) => setOccupation(event.target.value)}
      />
      <TextField
        margin="dense"
        value={location}
        label="Location"
        fullWidth
        type="string"
        autoComplete="off"
        onChange={(event) => setLocation(event.target.value)}
      />
    </form>
  );
};

export default AddDataForm;
