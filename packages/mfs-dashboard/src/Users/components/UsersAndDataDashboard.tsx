import React, { useCallback, useEffect, useState } from "react";
import List from "@material-ui/core/List";
import User from "./User";
import DataTable from "./DataTable";
import {
  CircularProgress,
  makeStyles,
  Typography,
  Box,
  Paper,
} from "@material-ui/core";
import UserModal from "./UserModal";
import { useUsersState } from "../hooks";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Button as MfsButton } from "@mfs/ui-library";
import { i18nnextCommonDashboard } from "@mfs/i18n";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const useStyles = makeStyles((theme) => ({
  list: {
    marginBottom: "15px",
    width: "95%",
    maxWidth: "600px",
    maxHeight: "800px",
    overflowY: "auto",
  },

  fab: {
    display: "block",
    margin: "15px",
  },

  noUsersPlaceholder: {
    color: "#adadad",
    textAlign: "center",
  },

  paper: {
    padding: "15px",
    width: "45%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "15px",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
      paddingBottom: "300px",
    },
    marginRight: "15px",
    position: "relative",
    minHeight: "800px",
  },

  buttonsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    bottom: "1rem",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    },
  },
}));

export interface UsersDashboardProps {
  fetchUsers: () => void;

  createUser: (user: User) => void;

  deleteUser: (user: User) => void;

  isLoading?: boolean;

  users: User[];

  className?: string;

  deletionsLoading: string[];

  rowData: RowData[];

  theme: any;

  createFakeRowData: (properties: TableDataProps) => void;

  hasUsers: boolean;
}

export const UsersDashboard = ({
  fetchUsers,
  createUser,
  isLoading = false,
  users,
  className,
  deleteUser,
  deletionsLoading,
  rowData,
  createFakeRowData,
  hasUsers,
}: UsersDashboardProps) => {
  const classes = useStyles();
  const refreshButton = React.useRef(null);
  const customEventButton = React.useRef(null);

  const [isDialogOpen, setDialogOpenState] = useState(false);
  const onAddClick = () => setDialogOpenState(true);

  useEffect(() => {
    Promise.resolve().then(() => {
      if (refreshButton.current) {
        refreshButton.current.injectProps({
          onClick: () => fetchUsers(),
          disabled: false,
        });
      }
    });
  }, [fetchUsers]);

  useEffect(() => {
    Promise.resolve().then(() => {
      const listener = (params: CustomEvent) => {
        alert(params.detail.data);
      };
      if (customEventButton.current) {
        customEventButton.current.addEventListener(
          MfsButton.EVENTS.USER_CLICKED,
          listener
        );
      }

      return () => {
        customEventButton.current.removeEventListener(
          MfsButton.EVENTS.USER_CLICKED,
          listener
        );
      };
    });
  }, []);

  const onCloseCallback = useCallback(() => {
    setDialogOpenState(false);
  }, []);

  const onSubmitCallback = useCallback(
    ({ age, name }: User) => {
      onCloseCallback();
      createUser({ age, name });
    },
    [createUser, onCloseCallback]
  );

  const renderUserList = () => {
    if (isLoading) {
      return (
        <Box py={10}>
          <CircularProgress color="secondary" size={80} />
        </Box>
      );
    }

    if (!hasUsers) {
      return (
        <Box py={10}>
          <Typography variant="h4" className={classes.noUsersPlaceholder}>
            No users to display
          </Typography>
        </Box>
      );
    }

    return (
      <List className={classes.list}>
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            onDeleteClick={deleteUser}
            isDeleteLoading={deletionsLoading.includes(user.id)}
          />
        ))}
      </List>
    );
  };

  const paperProps = {
    className: classes.paper,
  };

  return (
    <div className={className}>
      <Paper {...paperProps} style={{ minHeight: "865px" }}>
        {renderUserList()}
        <div className={classes.buttonsWrapper}>
          <Fab
            color="primary"
            variant="extended"
            aria-label="add"
            onClick={onAddClick}
            className={classes.fab}
            style={{ margin: "15px" }}
          >
            <AddIcon />
            <Typography variant="button">Add user</Typography>
          </Fab>
          <mfs-button ref={refreshButton}>
            {i18nnextCommonDashboard.t("Users.")}
          </mfs-button>
          <mfs-button ref={customEventButton}>Custom event</mfs-button>
        </div>
      </Paper>

      <Paper {...paperProps}>
        {<DataTable rowData={rowData} createFakeRowData={createFakeRowData} />}
      </Paper>

      <UserModal
        isOpen={isDialogOpen}
        onClose={onCloseCallback}
        onSubmit={onSubmitCallback}
      />
    </div>
  );
};

const ConnectedComponent = (props) => {
  const {
    fetchUsers,
    users,
    createUser,
    deleteUser,
    isLoading,
    deletionsLoading,
    rowData,
    createFakeRowData,
    hasUsers,
  } = useUsersState(props);

  return (
    <UsersDashboard
      {...props}
      {...{
        fetchUsers,
        users,
        createUser,
        deleteUser,
        isLoading,
        deletionsLoading,
        rowData,
        createFakeRowData,
        hasUsers,
      }}
    />
  );
};

export default ConnectedComponent;
