import axios from "axios";
import qs from "qs";

axios.defaults.withCredentials = true; //表示跨域请求时是否需要使用凭证
axios.defaults.crossDomain = true; //允许跨域

export let get = async (url, params) => {
  url = url.replace("/api/", "/api_pc/");

  let { data } = await axios.get(url, {
    params: params
  });
  return data;
};
export let post = async (url, data = {}, params) => {
  url = url.replace("/api/", "/api_pc/");
  if (params) {
    url = url + "?" + qs.stringify(params);
  }
  try {
    let res = await axios.post(
      url,
      { content: data },
      {
        // headers: { token: "", platform: "web" }
      }
    );
    console.log("返回状态：" + res.status);
    if (res.status != 200 || res.data.code == "999999") {
      //跳登录
      //模拟登录地址 http://eas.xraybot.com/api/callback?ticket=626
      window.location.href = process.env.VUE_APP_LOGIN_URL;
    }
    return res.data;
  } catch (e) {
    window.location.href = process.env.VUE_APP_LOGIN_URL;
  }
};
