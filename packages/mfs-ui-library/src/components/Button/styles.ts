import styled from "styled-components";

export const SButton = styled.button`
  cursor: pointer;
  padding: 0;
  font-size: 0.875rem;
  min-width: 0;
  box-sizing: border-box;
  min-height: 36px;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 50%;
  text-transform: uppercase;
  border: none;
  margin: 15px;
  width: auto;
  height: 48px;
  padding: 0 16px;
  min-width: 48px;
  min-height: auto;
  border-radius: 24px;
  color: #fff;
  background-color: #3f51b5;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:active {
    box-shadow: 0px 7px 8px -4px rgb(0 0 0 / 20%),
      0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%);
  }

  &:focus {
    outline: none;
    outline-width: 0;
  }
`;
