import React from "react";
import _ from "../../styles/urlInput.module.scss";

export default function MediaUrlInput({
  url,
  setUrl,
  urlType,
  altText,
  setAltText,
  confirmMedia,
  setShowMediaUrlInput,
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

  const clearInput = () => {
    setUrl("");
    setAltText("");
    setShowMediaUrlInput(false);
  };

  let message = () => {
    if (urlType === "image") {
      return (
        <p>
          Add a link to your photo and an alternative text, it works with
          Unsplash
        </p>
      );
    } else if (urlType === "video") {
      return (
        <p>
          Add a link to your video and an alternative text, it works with
          Youtube :)
        </p>
      );
    } else if (urlType === "google") {
      return (
        <div>
          <p>You can add Google slides, Google sheets and Google docs</p>
          <details>
            <summary>First publish it on the web</summary>
            <p>In your Google document, go to File/Publish to the web</p>
            <p>In the link tab, click on Publish</p>
          </details>
          <p>Paste the link from the Link tab in the Publish to web pop up.</p>
          <p>Copy it below</p>
        </div>
      );
    }
  };

  return (
    <div className={_.inputComponent}>
      {message()}
      <form>
        <input
          onChange={onUrlChange}
          /* ref="url" */
          type="text"
          placeholder="Add a link"
          value={url}
          onKeyDown={onUrlInputKeyDown}
        />
        {urlType !== "google" && (
          <input
            onChange={onTextChange}
            /* ref="url" */
            type="text"
            placeholder="Don't forget the alternative text"
            value={altText}
            onKeyDown={onUrlInputKeyDown}
          />
        )}
        <div className={_.btnContainer}>
          <button onMouseDown={confirmMedia}>Confirm</button>
          <button onMouseDown={clearInput}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
