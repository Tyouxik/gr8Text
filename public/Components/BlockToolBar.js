import React from "react";

export default function BlockToolBar({ editorState, onBlockToggle }) {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  const BlockButtons = blockStyles.map((block) => {
    return (
      <button
        active={blockType === "header-one"}
        onClick={() => onBlockToggle(block.style)}
      >
        {block.label}
      </button>
    );
  });
  return <div>{BlockButtons}</div>;
}

const blockStyles = [
  { label: "h1", style: "header-one" },
  { label: "h2", style: "header-two" },
  { label: "h3", style: "header-three" },
];
