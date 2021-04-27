import React, { useState, useEffect } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { blockRenderer } from "./EditorUtils";

export default function ContentViewer({ content }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(convertFromRaw(content))
  );

  useEffect(() => {
    setEditorState(() =>
      EditorState.createWithContent(convertFromRaw(content))
    );
  }, []);

  return (
    <div style={styles.editor}>
      <Editor
        readOnly={true}
        editorState={editorState}
        blockRendererFn={blockRenderer}
      />
    </div>
  );
}

const styles = {
  root: {
    fontFamily: "'Helvetica', sans-serif",
    padding: 20,
  },
  editor: {
    border: "1px solid #ccc",
    cursor: "text",
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: "center",
  },
};
