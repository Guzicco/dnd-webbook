// workaround for bug existing in api in aligments url

const fixURL = (url: string) => {
  const fixedURL = url.startsWith("/") ? url : `/${url}`;
  return fixedURL;
};

export default fixURL;
