import Button from "./Button";
import defineElement from "../utils/web-components";

const defineComponents = () => {
  let defined = false;

  return () => {
    if (!defined) {
      defineElement("mfs-button", Button);
      defined = true;
    }
  };
};

export default defineComponents();
