import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  RichUtils,
  AtomicBlockUtils,
} from "draft-js";

import EditorToolbar from "./EditorToolbar";
import MediaUrlInput from "./MediaUrlInput";
import { blockRenderer } from "./EditorUtils";
import { useCourse } from "../../utils/course-context";
import _ from "../../styles/contentEditor.module.scss";

export default function ContentEditor({ lessonContent, setLessonContent }) {
  const { activeLesson } = useCourse();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [url, setUrl] = useState("");
  const [urlType, setUrlType] = useState("");
  const [showMediaUrlInput, setShowMediaUrlInput] = useState(false);
  const [altText, setAltText] = useState("");

  useEffect(() => {
    if (activeLesson.content) {
      setEditorState(() =>
        EditorState.createWithContent(convertFromRaw(activeLesson.content))
      );
    } else {
      setEditorState(() => EditorState.createEmpty());
    }
  }, [activeLesson.id]);

  const onChange = (editorstate) => {
    const raw = convertToRaw(editorstate.getCurrentContent());
    console.log(raw);

    setLessonContent(raw);
    setEditorState(editorstate);
  };

  //Change the inline Styling of the selected text
  const onInlineToggle = (style) => {
    onChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  //Change the block type of the selected block
  const onBlockToggle = (style) => {
    onChange(RichUtils.toggleBlockType(editorState, style));
  };

  //Add a media to content editor
  const promptForMedia = (type) => {
    setShowMediaUrlInput(true);
    setUrlType(type);
  };

  const confirmMedia = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      urlType,
      "IMMUTABLE",
      { src: url, alt: altText }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
    setShowMediaUrlInput(false);
    setUrl("");
    setUrlType("");
    setAltText("");
  };

  return (
    <div className={_.container}>
      <EditorToolbar
        editorState={editorState}
        onBlockToggle={onBlockToggle}
        onInlineToggle={onInlineToggle}
        promptForMedia={promptForMedia}
      />

      {showMediaUrlInput && (
        <MediaUrlInput
          url={url}
          urlType={urlType}
          setUrl={setUrl}
          altText={altText}
          setAltText={setAltText}
          confirmMedia={confirmMedia}
          setShowMediaUrlInput={setShowMediaUrlInput}
        />
      )}
      <div className={_.editor} onClick={focus}>
        <Editor
          editorState={editorState}
          onChange={(e) => onChange(e)}
          blockRendererFn={blockRenderer}
        />
      </div>
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
    padding: 0,
  },
};
