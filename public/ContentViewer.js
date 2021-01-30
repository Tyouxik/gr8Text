import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";

import { Editor, EditorState, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { styleMap } from "./stylemap";

export default function MyEditor(props) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(convertFromRaw(props.lesson.content))
  );
  useEffect(() => {
    setEditorState(() =>
      EditorState.createWithContent(convertFromRaw(props.lesson.content))
    );
  }, [props.lesson.content]);

  return (
    <Editor
      customStyleMap={styleMap}
      editorState={editorState}
      /* onChange={setEditorState} */
      readOnly={true}
    />
  );
}
