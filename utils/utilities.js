export const collectIdsAndData = (doc) => ({ id: doc.id, ...doc.data() });

export const fetcher = async (url, token) => {
  const res = await fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  });

  return res.json();
};
