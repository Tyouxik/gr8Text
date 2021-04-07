import React from "react";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough } from "react-icons/fa";
import ToolbarBtn from "../Atoms/ToolbarBtn";

export default function InlineToolBar({ onInlineToggle }) {
  const InlineButtons = inlineStyles.map((inline) => {
    return (
      <ToolbarBtn
        type={inline.style}
        label={inline.label}
        onClick={onInlineToggle}
      />
    );
  });
  return <div>{InlineButtons}</div>;
}

const inlineStyles = [
  { label: <FaBold />, style: "BOLD" },
  { label: <FaItalic />, style: "ITALIC" },
  { label: <FaUnderline />, style: "UNDERLINE" },
  { label: <FaStrikethrough />, style: "STRIKETHROUGH" },
];
