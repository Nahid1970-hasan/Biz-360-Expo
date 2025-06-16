import axios from "axios";
import { config } from "../config/config";
import getIp from 'react-native-public-ip';

export const socket = {
  post: async (body) => {
    const { URL, path } = config;
    body.data.public_ip = await getIp() || "";
    body.data.user_id = localStorage.getItem("user_id") || "";
    body.data.user_type = localStorage.getItem("user_type") || "";
    body.data.session_key = localStorage.getItem("session_key") || "";
    console.log(body)
    return axios
      .post(URL + path, body, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
      .then((d) => d.data)
      .then((d) => {
        if (d.tag == "success") {
          return d;
        } else if (d.tag == "error") {
          let CustormError = new Error(d.data.msg);
          CustormError.code = 400;
          CustormError.name = "failed";
          throw CustormError;
        } else if (d.tag == "unauthorized") {
          let CustormError = new Error(d.data.msg);
          CustormError.code = 401;
          CustormError.name = "unauthorized";
          throw CustormError;
        } else {
          let CustormError = new Error("Something went wrong pleaase try again");
          CustormError.code = 404;
          CustormError.name = "failed";
          throw CustormError;
        } 
      }).catch((err) => {
        let CustormError = new Error(err.message);
        CustormError.code = "ERR_NETWORK";
        CustormError.name = "nonetwork";
        throw CustormError;
      });
  },
  upload: async (data) => {
    const { URL, path } = config;
    data.append('public_ip', await getIp() || "");
    data.append('user_id', localStorage.getItem("user_id") || "");
    data.append('user_type', localStorage.getItem("user_type") || "");
    data.append('session_key', localStorage.getItem("session_key") || "");
    let configs = {
      method: 'post',
      maxBodyLength: Infinity,
      url: URL + path + '/upload',
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data
    };
    return axios.request(configs)
      .then((d) => d.data)
      .then((d) => {
        if (d.tag == "error") {
          let CustormError = new Error(d.data.msg);
          CustormError.code = 400;
          CustormError.name = "failed";
          throw CustormError;
        } else if (d.tag == "unauthorized") {
          let CustormError = new Error(d.data.msg);
          CustormError.code = 401;
          CustormError.name = "unauthorized";
          throw CustormError;
        } else {
          return d;
        }
      });
  },
  get: (getParams) => {
    const { bwdUrl, bwdPath } = config;
    const TOKEN = import.meta.env.VITE_BWD_TOKEN;
    return axios
      .get(bwdUrl + bwdPath + getParams, {
        headers: {
          "Authorization": "Bearer " + TOKEN
        },
      })
      .then((d) => {
        console.log(d)
        if (d.tag == "error") {
          let CustormError = new Error(d.data.msg);
          CustormError.code = 400;
          CustormError.name = "failed";
          throw CustormError;
        } else if (d.tag == "unauthorized") {
          let CustormError = new Error(d.data.msg);
          CustormError.code = 401;
          CustormError.name = "unauthorized";
          throw CustormError;
        } else {
          return d;
        }
      });
  },
};
