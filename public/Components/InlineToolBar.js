import React from "react";

export default function InlineToolBar({ onInlineToggle }) {
  const InlineButtons = inlineStyles.map((inline) => {
    return (
      <button onClick={() => onInlineToggle(inline.style)}>
        {inline.label}
      </button>
    );
  });
  return <div>{InlineButtons}</div>;
}

const inlineStyles = [
  { label: "bold", style: "BOLD" },
  { label: "italic", style: "ITALIC" },
  { label: "underline", style: "UNDERLINE" },
  { label: "strikethrough", style: "STRIKETHROUGH" },
];
