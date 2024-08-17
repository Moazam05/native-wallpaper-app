import axios from "axios";

const API_KEY = "15483859-46fef6116d13694a6dba7a9b6";

const apiURL = `https://pixabay.com/api/?key=${API_KEY}`;

const formatURL = (params) => {
  // {q, page, category, order}
  let url = apiURL + "&per_page=20&safesearch=true&editors_choice=true";
  if (!params) return url;

  let paramsKeys = Object.keys(params);
  paramsKeys.map((key) => {
    let value = key === "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });

  return url;
};

export const apiCall = async (params) => {
  try {
    const response = await axios.get(formatURL(params));
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.log("got error:", error.message);
    return {
      success: false,
      msg: error.message,
    };
  }
};
