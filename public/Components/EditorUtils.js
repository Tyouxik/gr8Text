import { Media } from "./MediaToolBar";

const blockRenderer = (block) => {
  if (block.getType() === "atomic") {
    return { component: Media, editable: false };
  }
};

export { blockRenderer };
