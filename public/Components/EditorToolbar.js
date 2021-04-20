import React from "react";
import InlineToolBar from "./InlineToolBar";
import BlockToolBar from "./BlockToolBar";
import { MediaToolBar } from "./MediaToolBar";
import styles from "../../styles/EditorToolbar.module.scss";

export default function EditorToolbar({
  onInlineToggle,
  editorState,
  onBlockToggle,
  promptForMedia,
}) {
  return (
    <div className={styles.toolbars}>
      <MediaToolBar
        className={styles.toolbar}
        promptForMedia={promptForMedia}
      />
      <BlockToolBar
        className={styles.toolbar}
        editorState={editorState}
        onBlockToggle={onBlockToggle}
      />
      <InlineToolBar
        className={styles.toolbar}
        onInlineToggle={onInlineToggle}
      />
    </div>
  );
}
