import React from "react";
import { FaImage, FaVideo } from "react-icons/fa";
import ToolbarBtn from "../Atoms/ToolbarBtn";

function MediaToolBar({ promptForMedia }) {
  const mediaButtons = mediaTypes.map((media) => {
    return (
      <ToolbarBtn
        type={media.type}
        label={media.label}
        onClick={promptForMedia}
      />
    );
  });
  return <div>{mediaButtons}</div>;
}

const mediaTypes = [
  { label: <FaImage />, type: "image" },
  { label: <FaVideo />, type: "video" },
];

//Media components

function Media({ contentState, block }) {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, alt } = entity.getData();
  const type = entity.getType();
  console.log("I am media type", type, src);
  let media;
  if (type === "image") {
    media = <Image src={src} alt={alt} />;
  } else if (type === "video") {
    media = <Video src={src} alt={alt} />;
  }
  return media;
}

const Image = ({ src, alt }) => {
  return <img src={src} alt={alt} style={styles.media} />;
};

const Video = ({ src, alt }) => {
  if (src.includes("youtube")) {
    let startVideoIdIndex = src.indexOf("=") + 1;
    let videoId = src.substring(startVideoIdIndex);
    console.log({ videoId });
    let YouTubeSrc = `https://www.youtube.com/embed/${videoId}`;
    return (
      <iframe
        width="100%"
        height="315"
        src={YouTubeSrc}
        title={alt}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    );
  } else {
    return <video controls src={src} style={styles.media} />;
  }
};

const styles = {
  media: {
    width: "100%",
    // Fix an issue with Firefox rendering video controls
    // with 'pre-wrap' white-space
    whiteSpace: "initial",
  },
};

export { Media, MediaToolBar };
