import axios from '@/http'; // 导入http中创建的axios实例
import qs from 'qs';
import { Toast } from 'vant';
import base from '../api/base'; // 导入接口域名列表
import { Base64 } from 'js-base64';

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
  if(params.appid) {
    console.log('appid', params.appid);
    let url = encodeURIComponent('http://localhost:8085');
    console.log("跳转获取code");
    // Base64.encode('小飼弾');    // 5bCP6aO85by+
    // Base64.encodeURI('小飼弾'); // 5bCP6aO85by-
    console.log(Base64.decode('5bCP6aO85by+')); // 小飼弾
    // location.href = "https://www.baidu.com/";
    location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${params.appid}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
  } else if (params.code) {
    let formData = qs.stringify({
      code: params.code
    });
    axios.post(`${base.http}/getToken`, formData)
    .then((res) => {
      if(res.data.errnu == 0) {
        console.log(res);
        let xc_pwd_red_envelope = {
          token: res.data.data.token
        };
        localStorage.setItem("xc_pwd_red_envelope", JSON.stringify(xc_pwd_red_envelope));
      } else {
        Toast.fail('授权失败！');
      }
    })
    .catch((error) => {
      console.log(error);
      Toast.fail('服务器错误！');
    });
    // this.$router.push({
    //   path: '/'
    // })
    console.log(this)
  };
};

export default authorize;