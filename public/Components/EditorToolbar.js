import React from "react";
import InlineToolBar from "./InlineToolBar";
import BlockToolBar from "./BlockToolBar";
import { MediaToolBar } from "./MediaToolBar";
import styles from "../../styles/EditorToolbar.module.css";

export default function EditorToolbar({
  onInlineToggle,
  editorState,
  onBlockToggle,
  promptForMedia,
}) {
  return (
    <div className={styles.toolbars}>
      <InlineToolBar
        className={styles.toolbar}
        onInlineToggle={onInlineToggle}
      />
      <BlockToolBar
        className={styles.toolbar}
        editorState={editorState}
        onBlockToggle={onBlockToggle}
      />
      <MediaToolBar
        className={styles.toolbar}
        promptForMedia={promptForMedia}
      />
    </div>
  );
}
