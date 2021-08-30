import React from "react";
import { makeStyles } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import SnacksProvider from "./Snacks/SnacksProvider";
import { Provider } from "react-redux";
import configureAppStore from "./Users/configureStore";
import ApiService from "./Users/api";
import UsersDashboard from "./Users";

// Takes care of defining web-components that later can be used across microfrontend
import "@mfs/ui-library";

export const theme = createMuiTheme({});

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  section: {
    marginBottom: "30px",
    width: "100%",
  },
  dashboard: {
    width: "100%",
    display: "flex",
    padding: "15px",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
}));

export default function Root(props) {
  ApiService.init(props.apiServiceUrl);

  const store = configureAppStore({});
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SnacksProvider>
          <div className={classes.container}>
            <UsersDashboard
              className={classes.dashboard}
              events={props.events}
            />
          </div>
        </SnacksProvider>
      </Provider>
    </ThemeProvider>
  );
}
