import React from "react";
import ToolbarBtn from "../Atoms/ToolbarBtn";

export default function BlockToolBar({ editorState, onBlockToggle }) {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  const BlockButtons = blockStyles.map((block) => {
    return (
      <ToolbarBtn
        type={block.style}
        label={block.label}
        onClick={onBlockToggle}
      />
    );
  });
  return <div>{BlockButtons}</div>;
}

const blockStyles = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
];
