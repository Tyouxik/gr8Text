import React from "react";
import InlineToolBar from "./InlineToolBar";

export default function EditorToolbar({
  onInlineToggle,
  editorState,
  onH1Click,
  addImage,
}) {
  return (
    <div>
      <InlineToolBar onInlineToggle={onInlineToggle} />
      {/* <BlockToolBar editorState={editorState} onH1Click={onH1Click} />
        <MediaToolBar addImage={addImage} /> */}
    </div>
  );
}
