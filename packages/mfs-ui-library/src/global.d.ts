interface Dictionary<T> {
  [Key: string]: T;
}

interface CustomFunctionComponent<T> extends React.FunctionComponent<T> {
  EVENTS: Dictionary<string>;
}
