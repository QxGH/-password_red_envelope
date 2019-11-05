<template >
  <div class="cash-dialog" v-if="cashDialog.show">
    <div class="dialog-content">
      <div class="dialog-title">
        请输入提现金额
      </div>
      <div class="form-group">
        <div class="icon">￥</div>
        <div class="input-box">
          <input type="text" class="amount" autocomplete="off" name="amount" v-model="amount" @input="testNumber">
        </div>
      </div>
      <div class="balance">
        当前余额<span>{{cashDialog.allAmount}}</span>元，<span class="all" @click="acshAll">全部提现</span>
      </div>
      <div class="confirm-box">
        <button type="button" class="confirm-btn" @click="confirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from 'vant';
export default {
  name: 'cashDialog',
  props: {
    cashDialog: Object
  },
  data(){
    return {
      amount: ''
    }
  },
  methods: {
    confirm(){
      if(this.amount && this.amount <= this.cashDialog.allAmount) {
        this.$emit('cashConfirm', this.amount);
      } else if (this.amount && this.amount > this.cashDialog.allAmount){
        Notify({ type: 'warning', message: '提现金额超出了当前余额！' });
      } else {
        Notify({ type: 'warning', message: '请输入提现金额！' });
      };
    },
    acshAll(){
      this.amount = this.cashDialog.allAmount;
    },
    testNumber(e){
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      this.amount = e.target.value;
    }
  }
}
</script>

<style lang="scss">
  .cash-dialog {
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
      width: 321px;
      height: 220px;
      padding: 25px 23px;
      border-radius: 5px;
      box-sizing: border-box;
      position: absolute;
      top: 18%;
      left: 50%;
      transform: translateX(-50%);
    }
    .dialog-title {
      font-size: 14px;
      color: #333;
      font-weight: bold;
      line-height: 16px;
      height: 16px;
    }
    .form-group {
      height: 51px;
      border: 1px solid rgba(201,201,201,1);
      border-radius: 10px;
      margin: 10px 0;
      position: relative;
      box-sizing: border-box;
      padding: 0 10px;
      .icon {
        font-size: 23px;
        font-weight: bold;
        color: #333;
        font-family: 'PingFang-SC-Bold';
        position: absolute;
        line-height: 49px;
      }
      .input-box {
        box-sizing: border-box;
        padding-left: 30px;
        font-size: 0;
        .amount {
          border: 0;
          width: 100%;
          height: 49px;
          padding: 10px 0;
          box-sizing: border-box;
          font-size: 22px;
        }
      }
    }
    .balance {
      font-size: 14px;
      line-height: 16px;
      height: 16px;
      margin-bottom: 25px;
      color: #999;
      font-family: 'PingFang-SC-Medium';
      .all {
        color: #ED6868;
      }
    }
    .confirm-box {
      text-align: center;
    }
  }
</style>
