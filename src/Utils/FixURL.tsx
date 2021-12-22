// workaround for bug existing in api in aligments url

const FixURL = (url: string) => {
  const fixedURL = url.startsWith("/") ? url : `/${url}`;
  return fixedURL;
};

export default FixURL;
