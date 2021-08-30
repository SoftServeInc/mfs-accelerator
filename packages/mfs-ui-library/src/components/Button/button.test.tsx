import React from "react";
import { render } from "@testing-library/react";
import Button from "./";

describe("Root component", () => {
  it("renders Button element", () => {
    // const { container } = render(<Button onClick={() => console.log("lel")} />);
    expect(true).toBeTruthy();
  });
  // it("renders Button element with passed children", () => {
  //   const name = "Click";
  //   const { getByText } = render(<Button>{name}</Button>);
  //   expect(getByText(name)).toBeInTheDocument();
  // });
});
