import React, { useState, useEffect } from "react";
import { Editor, EditorState, convertFromRaw, createFromText } from "draft-js";
import { blockRenderer } from "./EditorUtils";
import _ from "../../styles/contentEditor.module.scss";

export default function ContentViewer({ content }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (content) {
      setEditorState(() =>
        EditorState.createWithContent(convertFromRaw(content))
      );
    } else {
    }
  }, [content]);

  if (!content) {
    return (
      <div className={_.noContent}>
        <h1>Oops this lesson is empty</h1>
        <p>Sorry about that, we are working on it</p>
      </div>
    );
  }

  return (
    <div className={_.editor}>
      <Editor
        readOnly={true}
        editorState={editorState}
        blockRendererFn={blockRenderer}
      />
    </div>
  );
}
