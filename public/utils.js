import DOMPurify from "dompurify";
//Utils for content editor
export const createMarkup = (html) => {
  return {
    __html: DOMPurify.sanitize(html),
  };
};
