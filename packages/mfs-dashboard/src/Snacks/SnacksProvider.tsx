/**
 * This snacks provider should be extracted to ui library
 */
import React from "react";
import { DefaultRootState, useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import { toggleInfo } from "./reducer";

interface SnackState  {
  snacks: {
    info: {
      visible: boolean;
      message: string;
    }
  }
}

const SnacksProvider = ({ children }) => {
  const visible = useSelector((state: SnackState) => state.snacks.info.visible);
  const message = useSelector((state: SnackState) => state.snacks.info.message);

  const dispatch = useDispatch();

  const closeInfo = () => dispatch(toggleInfo(false));

  return (
    <>
      <Snackbar
        open={visible}
        autoHideDuration={6000}
        onClose={() => closeInfo()}
        message={message}
      />
      {children}
    </>
  );
};

export default SnacksProvider;
