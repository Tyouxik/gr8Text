import React from "react";

export default function MediaUrlInput({
  url,
  setUrl,
  urlType,
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

  let message;
  if (urlType === "image") {
    message =
      "Add a link to your photo and an alternative text, it works with Unsplash";
  } else if (urlType === "video") {
    message =
      "Add a link to your video and an alternative text, it works with Youtube :)";
  }
  return (
    <div>
      <p>{message}</p>
      <input
        onChange={onUrlChange}
        /* ref="url" */
        type="text"
        placeholder="Add a link"
        value={url}
        onKeyDown={onUrlInputKeyDown}
      />
      <input
        onChange={onTextChange}
        /* ref="url" */
        type="text"
        placeholder="Don't forget the alternative text"
        value={altText}
        onKeyDown={onUrlInputKeyDown}
      />
      <button onMouseDown={confirmMedia}>Confirm</button>
    </div>
  );
}
