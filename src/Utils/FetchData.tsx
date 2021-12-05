import Axios from "axios";

const fetchData = async (link: string) => {
	try {
		const response = await Axios.get(link);
		return await response.data;
	} catch (err) {
		console.log(err);
	}
};
export default fetchData;
