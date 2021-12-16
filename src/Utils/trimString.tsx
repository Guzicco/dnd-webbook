const trimString: (stringToTrim: string) => string = (stringToTrim) => {
	return stringToTrim.replace("-", " ").toUpperCase();
};

export default trimString;
