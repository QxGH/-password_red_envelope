import base from './base'; // 导入接口域名列表
import axios from '@/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const home = {
  // home    
  homeIndex(params) {
    return axios.get(`${base.http}/userInfo`, {params});
  },
  // post提交
  homeList(params) {
    return axios.post(`${base.http}/tableData`, qs.stringify(params));
  }
}

export default home;