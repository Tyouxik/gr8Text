import React from "react";
import InlineToolBar from "./InlineToolBar";
import BlockToolBar from "./BlockToolBar";
import { MediaToolBar } from "./MediaToolBar";

export default function EditorToolbar({
  onInlineToggle,
  editorState,
  onBlockToggle,
  promptForMedia,
}) {
  return (
    <div>
      <InlineToolBar onInlineToggle={onInlineToggle} />
      <BlockToolBar editorState={editorState} onBlockToggle={onBlockToggle} />
      <MediaToolBar promptForMedia={promptForMedia} />
    </div>
  );
}
