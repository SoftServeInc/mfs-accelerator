import React from "react";
import PropTypes from "prop-types";
import { createEvent, useEvents } from "../../utils/events";
import { SButton } from "./styles";

interface Props {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: string;
  element: any;
}

const Button: CustomFunctionComponent<Props> = (props) => {
  const { onClick, children, ...rest } = props;
  const { emit } = useEvents(props);

  const handleClick = (e) => {
    emit(
      createEvent(Button.EVENTS.USER_CLICKED, {
        data: "Custom event data from Button",
      })
    );
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <SButton {...rest} onClick={handleClick}>
      {children}
    </SButton>
  );
};

/**
 * Prop types have to be defined to make reactivity available
 */
Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.string,
  children: PropTypes.any,
};

Button.EVENTS = {
  USER_CLICKED: "mfs-button:user-clicked",
};

export default Button;
