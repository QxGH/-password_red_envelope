<template>
  <div class="result-404">
    <van-icon class="question-icon" name="clear" />
    <div class="result-tips">
      抱歉，您访问的页面不存在！
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant';
export default {
  name: '404',
  components: {
    'van-icon': Icon
  }
}
</script>

<style lang="scss">
  .result-404 {
    text-align: center;
    padding-top: 100px;
    .question-icon {
      font-size: 80px;
      color: #FF603B;
    }
    .result-tips {
      color: #999;
      font-size: 16px;
      margin-top: 20px;
    }
  }  
</style>