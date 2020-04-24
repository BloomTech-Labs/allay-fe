import axios from "axios";

export default function axiosToDS() {
  //"proxy" => server to avoid Access-Control-Allow-Origin error: this proxy sets access to *
  const proxy = "https://cors-anywhere.herokuapp.com/";
  return axios.create({
    baseURL: `${proxy}https://allay23-staging-ds.herokuapp.com/`
  });
}
