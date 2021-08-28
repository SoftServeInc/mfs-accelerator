import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FaceIcon from "@material-ui/icons/AccountCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  ButtonBase,
  Card,
  CardContent,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    icon: {
      color: theme.palette.primary.main,
      width: "4em",
      height: "4em",
    },
    name: {},
    age: {},
    card: {
      width: "100%",
    },
    cardContent: {
      display: "flex",
      alignItems: "center",
      backgroundColor: theme.palette.background.default,
      flexDirection: "row",
      "&:last-child": {
        padding: "12px",
      },
    },
    deleteIcon: {
      color: theme.palette.secondary.main,
      width: "1em",
      height: "1em",
    },
    deleteIconWrapper: {
      width: "3em",
      height: "3em",
      marginLeft: "auto",
      borderRadius: "50%",
    },
    info: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
    },
  };
});

interface Props {
  user: User;
  onDeleteClick: (user: User) => void;
  isDeleteLoading: boolean;
}

const User = ({ user, onDeleteClick, isDeleteLoading }: Props) => {
  const classes = useStyles();
  return (
    <ListItem>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <ListItemIcon style={{ marginRight: "1em" }}>
            <FaceIcon
              className={classes.icon}
              style={{ width: "4em", height: "4em" }}
            />
          </ListItemIcon>
          <div className={classes.info}>
            <Typography variant="h6" className={classes.name}>
              {user.name}
            </Typography>
            {Boolean(user.age) && (
              <Typography className={classes.age}>{user.age} years</Typography>
            )}
          </div>

          {isDeleteLoading ? (
            <CircularProgress color="secondary" size={30} />
          ) : (
            <ButtonBase
              className={classes.deleteIconWrapper}
              onClick={() => onDeleteClick(user)}
            >
              <DeleteIcon className={`${classes.icon} ${classes.deleteIcon}`} />
            </ButtonBase>
          )}
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default User;
