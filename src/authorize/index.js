import axios from 'axios';
import qs from 'qs';
import { Toast } from 'vant';
import base from '../api/base'; // 导入接口域名列表

let getParams = () => {
  // 获取 url 参数
  let url = location.search;
  let theParams = new Object();
  if (url.indexOf("?") != -1) {
    let str = url.substr(1);
    let strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theParams[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
    }
  };
  return theParams;
};

let authorize = () => {
  let params = getParams();
  console.log(params);
  if(!params.code) {
    return;
  };
  let formData = qs.stringify({
    code: params.code
  });
  axios.post(`${base.http}/getToken`, formData)
  .then((res) => {
    if(res.data.errnu == 0) {
      console.log(res);
      localStorage.setItem("password_red_envelope_token", res.data.data.token);
    } else {
      Toast.fail('授权失败！');
    }
  })
  .catch((error) => {
    console.log(error);
    Toast.fail('服务器错误！');
  });
};

export default authorize;