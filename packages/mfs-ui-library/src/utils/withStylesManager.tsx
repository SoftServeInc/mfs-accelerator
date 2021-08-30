import React from "react";

import { StyleSheetManager } from "styled-components";

const withStylesManager = (Comp) => ({ renderRoot, children, ...props }) => (
  <StyleSheetManager target={renderRoot}>
    <Comp {...props}>{children}</Comp>
  </StyleSheetManager>
);

export default withStylesManager;
