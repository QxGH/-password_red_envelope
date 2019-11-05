<template >
  <div class="waining-dialog" v-if="wainingDialog.show">
    <div class="dialog-content">
      <div class="dialog-header">
        <div class="title">
          恭喜您已中奖
        </div>
      </div>
      <div class="dialog-body">
        <div class="body-border">
          <div class="prize-name">
            <template v-if="wainingDialog.type == 1">美的吸尘器</template>
            <template v-if="wainingDialog.type == 2">
              <span>599</span>积分
            </template>
            <template v-if="wainingDialog.type == 3">
              红包<span>2.2</span>元
            </template>
          </div>
          <div class="prize-img">
            <img v-if="wainingDialog.type == 1" class="goods img" src="../assets/images/goods_img.png" alt="">
            <img v-if="wainingDialog.type == 2" class="integral img" src="../assets/images/integral_img.png" alt="">
            <img v-if="wainingDialog.type == 3" class="money img" src="../assets/images/money_img.png" alt="">
          </div>
          <div class="tips">
            完善以下信息领取奖品
          </div>
          <div class="form-box">
            <div class="form-item">
              <input class="input-control" v-model="formData.phone" autocomplete="off" type="text" placeholder="请输入您的手机号码" name="phone" maxlength="11" @input="testNumber">
            </div>
            <div class="form-item">
              <div class="form-group clearfix">
                <input class="input-control" v-model="formData.code" autocomplete="off" type="text" placeholder="请输入验证码" name="phone" maxlength="6">
                <div class="btn-box">
                  <button type="button" class="send-btn" @click="sendCode" :disabled="sendCodeBtnDisabled">{{sendCodeBtnText}}</button>
                </div>
              </div>
            </div>
            <div class="form-item" v-if="wainingDialog.type == 1">
              <input class="input-control" v-model="formData.addr" autocomplete="off" type="text" placeholder="请输入您的收货地址" name="phone">
            </div>
          </div>
          <div class="confirm">
            <button type="button" class="confirm-btn" @click="confirm">确认领取</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from 'vant';
export default {
  name: 'wainingDialog',
  props: {
    wainingDialog: Object
  },
  data(){
    return {
      sendCodeBtnText: '发送验证码',
      sendCodeBtnDisabled: false, 
      formData: {
        phone: '',
        code: '',
        addr: ''
      }
    }
  },
  methods: {
    confirm(){
      //提交
      let phone = this.formData.phone;
      if(!(/^1[3456789]\d{9}$/.test(phone))) { 
        Notify({ type: 'warning', message: '手机号码有误！' });
        return; 
      };
      if(!this.formData.code) {
        Notify({ type: 'warning', message: '请输入验证码！' });
        return; 
      };
      if(!this.formData.addr) {
        Notify({ type: 'warning', message: '请输入收货地址！' });
        return; 
      };
      let wainingData = {
        type: this.wainingDialog.type,
        formData: this.formData
      };
      this.$emit('wainingConfirm', wainingData);
    },
    testNumber(e){
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      this.formData.phone = e.target.value;
    },
    sendCode(){
      // 发送验证码
      const self = this;
      let phone = this.formData.phone;
      if(!(/^1[3456789]\d{9}$/.test(phone))){ 
        Notify({ type: 'warning', message: '手机号码有误！' });
        return; 
      } else {
        let laterTime = 59;
        self.sendCodeBtnText = '(60s)';
        self.sendCodeBtnDisabled = true;
        let later = setInterval(()=>{
          if(laterTime >= 0) {
            self.sendCodeBtnText = `(${laterTime}s)`;
            laterTime--;
          } else {
            self.sendCodeBtnText = '发送验证码';
            self.sendCodeBtnDisabled = false;
            clearInterval(later);
          }
        }, 1000);
      }
    }
  }
}
</script>

<style lang="scss">
  .waining-dialog {
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
      width: 263px;
      background: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
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
    .prize-name {
      font-size: 15px;
      font-family: 'PingFang SC';
      font-weight: bold;
      line-height: 17px;
      height: 17px;
      text-align: center;
      color: #333;
      margin-bottom: 15px;
    }
    .prize-img {
      font-size: 0;
      text-align: center;
      .img {
        &.goods {
          width: 117px;
          height: 94px;
          margin-bottom: 10px;
        }
        &.integral {
          width: 115px;
          height: 86px;
          margin-bottom: 20px;
        }
        &.money {
          width: 133px;
          height: 121.5px;
          margin-bottom: 10px;
        }
      }
    }
    .tips {
      font-size: 12px;
      line-height: 14px;
      color: #333;
      font-family: 'PingFang-SC-Regular';
      margin-bottom: 15px;
    }
    .form-box {
      padding: 0 28px;
      box-sizing: border-box;
      .form-item {
        margin-bottom: 10px;
      }
      .input-control {
        height: 29px;
        line-height: 25px;
        background:rgba(230,230,230,1);
        border-radius:5px;
        box-sizing: border-box;
        padding: 2px 8px;
        box-shadow: 0 0;
        border: 0;
        display: block;
        font-size: 12px;
        width: 100%;
        &::-webkit-input-placeholder {
          color: #666;
          font-size: 10px;
        line-height: 27px;
        }
        &:-moz-placeholder {
          color: #666;
          font-size: 10px;
        }
        &::-moz-placeholder {
          color: #666;
          font-size: 10px;
        }
        &:-ms-input-placeholder {
          color: #666;
          font-size: 10px;
        }
      }
      .form-group {
        position: relative;
        .input-control {
          width: 110px;
          position: absolute;
        }
        .btn-box {
          padding-left: 115px;
          box-sizing: border-box;
        }
        .send-btn {
          width: 100%;
          height: 29px;
          border-radius: 5px;
          background: #FFDDDD;
          font-size: 10px;
          color: #666;
          border: 0;
          text-align: center;
          vertical-align: top;
          &:disabled {
            background: #eee;
          }
        }
      }
    }
    .confirm {
      padding: 5px 0 15px;
      font-size: 0;
    }
  }
</style>
