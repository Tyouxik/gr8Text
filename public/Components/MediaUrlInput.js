import React from "react";

export default function MediaUrlInput({
  url,
  setUrl,
  altText,
  setAltText,
  confirmMedia,
}) {
  const onUrlInputKeyDown = (e) => {
    if (e.which === 13) {
      confirmMedia(e);
    }
  };
  const onUrlChange = (e) => {
    setUrl(e.target.value);
  };
  const onTextChange = (e) => {
    setAltText(e.target.value);
  };
  return (
    <div>
      <input
        onChange={onUrlChange}
        /* ref="url" */
        type="text"
        value={url}
        onKeyDown={onUrlInputKeyDown}
      />
      <input
        onChange={onTextChange}
        /* ref="url" */
        type="text"
        value={altText}
        onKeyDown={onUrlInputKeyDown}
      />
      <button onMouseDown={confirmMedia}>Confirm</button>
    </div>
  );
}
