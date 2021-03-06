// import Cookie from "js-cookie";

async function fetch_a(tempTokenString, token, url, options) {
  const tokenString = `Token ${tempTokenString}`; // `Token ${Cookie.get(token)}`;
  if (options === undefined) {
    options = {
      headers: {
        Authorization: tokenString,
      },
    };
  } else if (options.headers === undefined) {
    options.headers = {
      Authorization: tokenString,
    };
  } else {
    options.headers.Authorization = tokenString;
  }
  return await fetch(url, options);
}

export default fetch_a;
