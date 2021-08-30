import createElement from "./ReactCustomElementWithProps";
import withStylesManager from "../../utils/withStylesManager";

const defineElement = (name, Component) => {
  customElements.define(
    name,
    createElement(
      withStylesManager(Component),
      Object.keys(Component.propTypes)
    )
  );
};

export default defineElement;
