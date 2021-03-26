import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  convertFromHTML,
  convertToRaw,
  ContentState,
} from "draft-js";

export default function ContentEditor({
  readOnly,
  activeLesson,
  lessonContent,
  setLessonContent,
}) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    setConvertedContent(convertToRaw(editorState.getCurrentContent()));
    setLessonContent(convertedContent);
  }, [editorState]);

  return (
    <div style={styles.root}>
      <div style={styles.editor} /* onClick={focus} */>
        <Editor
          readOnly={readOnly}
          editorState={editorState}
          onChange={setEditorState}
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
