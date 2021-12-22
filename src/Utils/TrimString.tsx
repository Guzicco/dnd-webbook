const TrimString: (givenString: string) => string = (givenString: string) => {
  return givenString.toUpperCase().replace("-", " ");
};

export default TrimString;
