<template>
  <div class="login">
    <div class="loading-box" v-if="ifLoading">
      <van-loading type="spinner" color="#1989fa" size="45px" />
    </div>
    <div class="qrcode-box" v-else >
      <img :src="qrcodeSrc" class="img" alt="">
      <div class="tips">
        请在微信客户端打开
      </div>
    </div>
  </div>
</template>

<script>
import { Loading  } from "vant";

// 用户授权，获取 code
import authorize from "@/authorize"

export default {
  name: 'Login',
  components: {
    'van-loading': Loading
  },
  data() {
    return {
      qrcodeSrc: '',
      ifLoading: true
    }
  },
  mounted(){
    console.log(this.$route.query)
    if(this.$route.query.isBrowser == 0) {
      this.ifLoading = false;
      // this.$api.login.qrcode(data)
      // .then(res => {
      //   console.log(res) 
      // });
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss">
@import "../assets/style/login/login.min.css";
</style>