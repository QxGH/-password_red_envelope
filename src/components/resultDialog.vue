<template >
  <div class="result-dialog" v-if="resultDialog.show">
    <div class="dialog-content">
      <div class="result-title" v-if="resultDialog.type == 2">恭喜您！领取成功！</div>
      <div class="result-icon">
        <template v-if="resultDialog.type == 1">
          <img class="img" src="../assets/images/result_icon.png" alt="">
        </template>
        <template v-if="resultDialog.type == 2">
          <img class="img" src="../assets/images/qrcode.png" alt="">
        </template>
      </div>
      <div class="result-title" v-if="resultDialog.type != 2">恭喜您！领取成功！</div>
      <div class="result-tips">
        <template v-if="resultDialog.type == 1">请在【活动首页】-【我的奖品】 中查看</template>
        <template v-if="resultDialog.type == 2">长按进入【小程序名称】-【个人中心】 中查看获奖积分！</template>
        <template v-if="resultDialog.type == 3">红包已发放，请到【我的奖品】 页面中查看详情并提现！</template>
        <template v-if="resultDialog.type == 4">请到微信钱包中查看</template>
      </div>
      <button type="button" class="confirm-btn" @click="confirm">好哒</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resultDialog',
  props: {
    resultDialog: Object
  },
  methods: {
    confirm(){
      this.$emit('resultConfirm', this.resultDialog);
    }
  }
}
</script>

<style lang="scss">
  .result-dialog {
    background: rgba(0,0,0,.75);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    .dialog-content {
      background: #fff;
      width: 241px;
      height: 246px;
      padding: 25px 30px;
      border-radius: 5px;
      box-sizing: border-box;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .result-icon {
      height: 70px;
      font-size: 0;
      text-align: center;
      margin-bottom: 15px;
      .img {
        width: 70px;
        height: 70px;
      }
    }
    .result-title {
      font-size: 14px;
      color: #333;
      font-weight: bold;
      line-height: 16px;
      margin-bottom: 10px;
    }
    .result-tips {
      font-size: 12px;
      color: #999;
      font-family: 'PingFang-SC-Medium';
      line-height: 18px;
      text-align: center;
      margin-bottom: 10px;
    }
  }
</style>
