import axios from "axios";

const base = "/wp-json/um-configurator/v1";
function initBaseURL() {
  if (!axios.defaults.baseURL) {
    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL + base;
  }
}

export const appRequest = <T>(type: "get" | "delete" | "put" | "post") => {
  initBaseURL();

  switch (type) {
    case "get":
      return (url: string) => axios.get(url).then((res) => res.data as T);

    case "delete":
      return (url: string) => axios.delete(url);
    case "put":
      return (url: string, data?: any) =>
        axios.put(url, data).then((res) => res.data);
    case "post":
      return (url: string, data?: any) =>
        axios.post(url, data).then((res) => res.data);
  }
};
