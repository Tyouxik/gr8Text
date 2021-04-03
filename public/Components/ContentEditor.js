import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  RichUtils,
} from "draft-js";

import EditorToolbar from "./EditorToolbar";

export default function ContentEditor({
  readOnly,
  activeLesson,
  setLessonContent,
}) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onChange = (editorstate) => {
    const raw = convertToRaw(editorstate.getCurrentContent());
    console.log(raw);

    setLessonContent(raw);
    setEditorState(editorstate);
  };

  useEffect(() => {
    if (activeLesson.content) {
      setEditorState(() =>
        EditorState.createWithContent(convertFromRaw(activeLesson.content))
      );
    } else {
      setEditorState(() => EditorState.createEmpty());
    }
  }, [activeLesson.id]);

  //Change the inline Styling of the selected text
  const onInlineToggle = (style) => {
    onChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div style={styles.root}>
      <EditorToolbar onInlineToggle={onInlineToggle} />
      <div style={styles.editor} onClick={focus}>
        <Editor
          readOnly={readOnly}
          editorState={editorState}
          onChange={(e) => onChange(e)}
        />
      </div>
    </div>
  );
}

const styles = {
  root: {
    fontFamily: "'Helvetica', sans-serif",
    padding: 20,
    width: 600,
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