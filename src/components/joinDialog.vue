<template >
  <div class="join-dialog" v-if="joinDialog.show">
    <div class="dialog-overlay" @click="clickWrap"></div>
    <div class="dialog-content">
      <div class="dialog-header">
        <div class="title">
          <template v-if="joinDialog.type == 1">今天没机会了</template>
          <template v-if="joinDialog.type == 2">活动攻略</template>
          <template v-if="joinDialog.type == 3">改天再玩吧</template>
          <template v-if="joinDialog.type == 4">一起说口令</template>
        </div>
      </div>
      <div class="dialog-body">
        <div class="body-border">
          <div class="no-chance" v-if="joinDialog.type == 1">
            <img class="img" src="../assets/images/no_chance.png" alt="" srcset="">
            <div class="tips">
              <p>您今天已经没有机会了</p>
              <p>明天可继续再来哦</p>
            </div>
            <button type="button" class="iKnow-btn confirm-btn" @click="confirm"></button>
          </div>
          <div class="strategy" v-if="joinDialog.type == 2">
            <p>
              用户进入口令红包活动后，点击“立即抽奖”，最终停留的奖项即为用户所中的奖品，商家可在创建活动时对活动的样式、参数、概率、好友助力以及其他自定义功能进行设置。
            </p>
            <p>
              在创建活动时对活动的样式、参数、概率、好友助力以及其他自定义功能进行设置。
            </p>
          </div>
          <div class="no-integral" v-if="joinDialog.type == 3">
            <img class="img" src="../assets/images/no_integral.png" alt="" srcset="">
            <div class="tips">
              <p>积分不够啦，改天再玩吧</p>
            </div>
            <button type="button" class="iKnow-btn confirm-btn" @click="confirm"></button>
          </div>
          <div class="no-integral" v-if="joinDialog.type == 4">
            <img class="img" src="../assets/images/balloon.png" alt="" srcset="">
            <div class="tips">
              <p>分享好友可获得两次游戏机会哦！</p>
            </div>
            <button type="button" class="share-btn confirm-btn" @click="confirm"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'joinDialog',
  props: {
    joinDialog: Object
  },
  methods: {
    confirm(){
      this.$emit('joinConfirm', this.joinDialog);
    },
    clickWrap(){
      if(this.joinDialog.type == 2 || this.joinDialog.type == 4) {
        this.joinDialog.show = false;
        this.$emit('joinClose', this.joinDialog);
      };
    }
  }
}
</script>

<style lang="scss">
  .join-dialog {
    background: rgba(0,0,0,.75);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 997;
    width: 100%;
    height: 100%;
    background: transparent;
    .dialog-overlay {
      z-index: 998;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.75);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 998;
    }
    .dialog-content {
      width: 263px;
      height: 291px;
      background: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 999;
      transform: translate(-50%,-50%);
    }
    .dialog-header {
      width: 315px;
      height: 95px;
      background-image: url('../assets/images/join_header.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: -65px;
      left: -26px;
      text-align: center;
      box-sizing: border-box;
      padding-top: 40px;
      .title {
        font-size: 18px;
        line-height: 20px;
        height: 20px;
        font-family: 'PingFang SC';
        font-weight: bold;
        color: #fff;
      }
    }
    .dialog-body {
      height: 100%;
      padding: 0 9px 8px;
      box-sizing: border-box;
      .body-border {
        box-sizing: border-box;
        border:2px dashed rgba(234,68,69,1);
        border-radius:10px;
        height: 100%;
        padding-top: 30px;
        text-align: center;
      }
    }
    .no-chance {
      font-size: 0;
      .img {
        width: 123px;
        height: 123px;
        margin-bottom: 10px;
      }
      .tips {
        font-size: 12px;
        line-height: 20px;
        color: #333;
        font-family: 'PingFang-SC-Regular';
        margin-bottom: 8px;
      }
    }
    .confirm-btn {
      background-color: transparent;
      outline: 0;
      border: 0;
      width: 136px;
      height: 45px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      &.iKnow-btn {
        background-image: url('../assets/images/i_know.png');
      }
      &.share-btn {
        background-image: url('../assets/images/share_btn.png');
      }
    }
    .strategy {
      font-size: 14px;
      padding: 0 28px;
      box-sizing: border-box;
      text-align: left;
      margin-top: 5px;
      p {
        margin-bottom: 10px;
        font-family: 'PingFang-SC-Medium';
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .no-integral {
      .img {
        width: 101px;
        height: 120px;
      }
      .tips {
        color: #333;
        line-height: 16px;
        height: 16px;
        font-size: 12px;
        margin: 22px 0;
      }
    }
  }
</style>
