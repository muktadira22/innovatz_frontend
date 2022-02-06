import axios from "axios";
import { _retrieveData } from "./storage";
import { apiRoot } from "../config";

type AuthInterface = {
  token: string;
};

function ApiService() {
  const storage: AuthInterface | null = _retrieveData("user_data");
  let instance = axios.create({
    baseURL: apiRoot,
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(storage);
  if (storage?.token !== "") {
    if (storage?.token) {
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storage.token}`;
    }
  }
  
  return instance;
}

export default ApiService();
