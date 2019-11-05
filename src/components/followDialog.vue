<template >
  <div class="follow-dialog" v-if="followDialog.show">
    <div class="force dialog-content" v-if="followDialog.method == 1">
      <div class="qrcode">
        <img class="img" src="" alt="">
      </div>
      <div class="tips">
        <p>长按识别公众号</p>
        <p>发送<span v-if="followDialog.type == 1">语音</span><span v-else>文字</span>消息</p>
      </div>
      <div class="password">
        【<span>红鲤鱼与绿鲤鱼与驴</span>】
      </div>
      <button type="button" class="confirm-btn" @click="confirm"></button>
    </div>
    <div class="guide dialog-content" v-else>
      <div class="title">
        发送文字消息
      </div>
      <div class="password">
        【<span>红鲤鱼与绿鲤鱼与驴</span>】
      </div>
      <div class="public-account">
        给【<span>公众号名称</span>】
      </div>
      <button type="button" class="confirm-btn" @click="confirm"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'followDialog',
  props: {
    followDialog: Object
  },
  methods: {
    confirm(){
      this.$emit('followConfirm', this.followDialog);
    }
  }
}
</script>

<style lang="scss">
  .follow-dialog {
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
      padding: 30px 20px;
      border-radius: 5px;
      box-sizing: border-box;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .force {
      width: 263px;
      .qrcode {
        width: 103px;
        height: 103px;
        margin: 7px auto 10px;
        font-size: 0;
        .img {
          width: 100%;
          height: 100%;
        }
      }
      .tips {
        margin-bottom: 21px;
        p {
          font-family: 'PingFang-SC-Bold';
          font-weight: bold;
          font-size: 14px;
          color: #333;
          line-height: 18px;
        }
      }
    }
    .guide {
      width: 240px;
      .title {
        font-size: 14px;
        color: #333;
        line-height: 16px;
        margin-bottom: 18px;
      }
      .public-account {
        font-size: 12px;
        color: #333;
        margin-bottom: 30px;
      }
    }
    .password {
      font-size: 18px;
      line-height: 24px;
      color: #EA4445;
      font-family: 'PingFang SC';
      font-weight: bold;
      margin-bottom: 15px;
    }
    .confirm-btn {
      display: block;
      margin: 0 auto;
      width: 136px;
      height: 45px;
      border: 0;
      outline: 0;
      background-image: url('../assets/images/follow_confirm.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-color: transparent;
    }
  }
</style>
