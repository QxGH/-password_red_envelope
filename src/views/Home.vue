<template>
  <div class="home">
    <div class="top-img"></div>
    <div class="tag-box">
      <div class="prize tag-item" @click="toPrize">
        <span class="text">我的奖品</span>
      </div>
      <div class="method tag-item" @click="openStrategy">
        <span class="text">活动攻略</span>
      </div>
      <div class="integral tag-item">
        <span class="text">999积分</span>
      </div>
      <div class="share tag-item" @click="openShare">
        <span class="text">分享好友</span>
      </div>
    </div>
    <div class="password-box">红鲤鱼说他家的李屡屡比绿鲤鱼家的吕里里绿</div>
    <template>
      <div class="join-btn">
        <span class="join-text text">立即参与</span>
        <!-- <span class="input-text text">填口令</span> -->
      </div>
      <div class="join-tips">
        <span class="text">长按说出以上口令</span>
      </div>
    </template>
    <!-- <template>
      <div class="disabled-btn">
        <span class="text">谢谢参与</span>
      </div>
    </template>-->
    <div class="activity-tips">
      <div class="today-chance">今日还有3次参与机会</div>
      <div class="invitation-chance">每邀请一个好友可获得2次参与机会</div>
    </div>
    <div class="join-num-box">
      <div class="join-num">已有10000人参与</div>
    </div>
    <div class="down-btn" @click="showJoinPeople"></div>
    <van-popup
      v-model="joinPeoplePopup"
      round
      position="bottom"
      :style="{ height: '320px' }"
      @opened="joinPeoplePopupEnter"
      @closed="joinPeoplePopupClose"
    >
      <template>
        <div class="join-people-popup">
          <div class="popup-header clearfix">
            <div class="join-num pull-left">最近50人参与</div>
            <div class="join-type pull-right" @click="changeJoinType">
              <span v-if="joinType == '1'">全部</span>
              <span v-else>只看我</span>
            </div>
          </div>
          <div class="join-list" ref="joinList" v-if="joinList.length != 0">
            <ul ref="joinListItems">
              <li class="item clearfix" v-for="item in joinList" :key="item.id">
                <div class="pull-left">
                  <div class="avatar">
                    <img class="img" :src="item.avatar" alt srcset />
                  </div>
                  <div class="info">
                    <div class="name">{{item.name}}</div>
                    <div class="text" v-if="item.text">{{item.text}}</div>
                    <div class="voice" v-else>
                      <div class="bubble">
                        <i class="icon"></i>
                      </div>
                      <div class="time">44''</div>
                    </div>
                  </div>
                </div>
                <div class="pull-right">
                  <div class="prize">
                    获得
                    <span class="num">{{item.num}}</span>
                    元
                  </div>
                  <div class="date">{{item.date}}</div>
                </div>
              </li>
            </ul>
            <div class="join-list-loading" v-if="joinListLoading">
              加载中...
            </div>
          </div>
          <div class="join-empty" v-else>
            <i class="icon"></i>
            <div class="tips">还没有人参与，快参与拿奖吧！</div>
          </div>
        </div>
      </template>
    </van-popup>
    <!-- 分享提示 start -->
    <div class="share-tips-overlay" v-if="shareTipsOverlay" @click="shareTipsOverlay = false">
      <i class="icon"></i>
      <div class="tips">
        <p>点击右上角按钮</p>
        <p>分享活动</p>
        <p>邀请好友一起参与</p>
      </div>
    </div>
    <!-- 分享提示 end -->
    <!-- 关注弹窗 start -->
    <followDialog :followDialog="followDialog" @followConfirm="followSubmit"></followDialog>
    <!-- 关注弹窗 end -->
    <!-- 参与活动提示弹窗 start -->
    <joinDialog :joinDialog="joinDialog" @joinConfirm="joinSubmit"></joinDialog>
    <!-- 参与活动提示弹窗 end -->
    <!-- 中奖领取弹窗 start -->
    <wainingDialog :wainingDialog="wainingDialog" @wainingConfirm="wainingSubmit"></wainingDialog>
    <!-- 中奖领取弹窗 end -->
    <!-- 领奖结果弹窗 start -->
    <resultDialog :resultDialog="resultDialog" @resultConfirm="resultSubmit"></resultDialog>
    <!-- 领奖结果弹窗 end -->
    <!-- 红包提现弹窗 start -->
    <cashDialog :cashDialog="cashDialog" @cashConfirm="cashSubmit"></cashDialog>
    <!-- 红包提现弹窗 end -->

  </div>
</template>

<script>
// @ is an alias to /src
import followDialog from '@/components/followDialog.vue';  // 关注弹窗
import joinDialog from '@/components/joinDialog.vue';     // 参与活动提示弹窗
import wainingDialog from '@/components/wainingDialog.vue'; // 中奖领取弹窗
import resultDialog from '@/components/resultDialog.vue'; // 领奖结果弹窗
import cashDialog from '@/components/cashDialog.vue'; // 红包提现弹窗

import { Popup } from "vant";
export default {
  name: "home",
  components: {
    // HelloWorld
    "van-popup": Popup,
    followDialog,
    joinDialog,
    wainingDialog,
    resultDialog,
    cashDialog
  },
  data() {
    return {
      joinPeoplePopup: false, // 参与弹窗
      joinType: "1", // 1-全部；2-只看我
      joinList: [
        {
          id: 1,
          avatar:
            "https://teststatic.xingchen.cn/image/aowp/qpwf/bwwf/psll/aowpqpwfbwwfpsll.png",
          name: "荒原",
          text: "红鲤鱼说他家的李屡屡比绿鲤鱼家的吕里里绿",
          time: "44``",
          num: "4.6",
          date: "2019-09-17 09:10"
        },
        {
          id: 2,
          avatar:
            "https://teststatic.xingchen.cn/image/aowp/qpwf/bwwf/psll/aowpqpwfbwwfpsll.png",
          name: "荒原",
          text: "红鲤鱼说他家的李屡屡比绿鲤鱼家的吕里里绿",
          time: "44``",
          num: "2.8",
          date: "2019-09-17 09:10"
        },
        {
          id: 3,
          avatar:
            "https://teststatic.xingchen.cn/image/aowp/qpwf/bwwf/psll/aowpqpwfbwwfpsll.png",
          name: "荒原",
          text: "红鲤鱼说他家的李屡屡比绿鲤鱼家的吕里里绿",
          time: "44``",
          num: "5.3",
          date: "2019-09-17 09:10"
        },
        {
          id: 4,
          avatar:
            "https://teststatic.xingchen.cn/image/aowp/qpwf/bwwf/psll/aowpqpwfbwwfpsll.png",
          name: "荒原",
          text: "红鲤鱼说他家的李屡屡比绿鲤鱼家的吕里里绿",
          time: "44``",
          num: "8.1",
          date: "2019-09-17 09:10"
        },
        {
          id: 5,
          avatar:
            "https://teststatic.xingchen.cn/image/aowp/qpwf/bwwf/psll/aowpqpwfbwwfpsll.png",
          name: "荒原",
          text: "红鲤鱼说他家的李屡屡比绿鲤鱼家的吕里里绿",
          time: "44``",
          num: "3.2",
          date: "2019-09-17 09:10"
        }
      ],
      joinListLoading: false,
      followDialog: { // 关注弹窗
        show: false,
        method: 1,  // 1- 强制；2-引导
        type: 1,  // 1-语音；2-文字
        params: {
          
        }
      },
      joinDialog: { // 参与活动提示弹窗
        show: false, 
        type: 1, // 1-今天没机会了；2-活动攻略；3-积分不够，改天再玩；4-分享
      },
      wainingDialog: {  // 中奖领取弹窗
        show: false,
        type: 1,  // 1-实物；2-积分；3-红包；
      },  
      resultDialog: { // 领奖结果弹窗
        show: false,
        type: 2 //  1-实物；2-积分；3-红包自动发放；4-红包手动领取
      },
      cashDialog: { // 红包提现弹窗
        show: false,
        allAmount: '0.01' // 全部余额
      },
      shareTipsOverlay: false,  // 分享指示提示
    };
  },
  mounted() {
    console.log(this.$route.query)
    // let data = {
    //   id: 1111
    // };
    // this.$api.home.homeIndex(data)
    // .then(res => {
    //   console.log(res)
    // });
    // this.$api.home.homeList(data)
    // .then(res => {
    //   console.log(res)
    // });
  },
  methods: {
    followSubmit(val){
      // 关注弹窗点击确定
      console.log(val);
      if(val.method == 1) {
        // 强制关注
        if(val.type == 1) {
          // 强制关注-语音
          console.log('强制关注-语音')
        } else {
          // 强制关注-文字
          console.log('强制关注-文字')
        };
      } else {
        // 引导关注
        if(val.type == 1) {
          // 引导关注-语音
          console.log('引导关注-语音')
        } else {
          // 引导关注-文字
          console.log('引导关注-文字')
        };
      };
      this.followDialog.show = false;
    },
    joinSubmit(val){
      // 参加活动 弹窗 关闭
      if(val.type == 4) {
        this.shareTipsOverlay = true;
      };
      this.joinDialog.show = false;
    },
    wainingSubmit(val){
      // 获奖领取弹窗 确定
      console.log(val);
      this.wainingDialog.show = false;
    },
    resultSubmit(val){
      // 获奖结果弹窗 关闭
      console.log(val)
      this.resultDialog.show = false;
    },
    cashSubmit(val){
      // 红包提现弹窗 
      console.log(val);
      this.cashDialog.show = false;
    },
    openStrategy(){
      // 打开活动攻略
      this.joinDialog.type = 2;
      this.joinDialog.show = true;
    },
    openShare(){
      // 打开分享好友弹窗
      this.joinDialog.type = 4;
      this.joinDialog.show = true;
    },
    toPrize(){
      // 跳转到 我的奖品
      this.$router.push({
        path: '/prize'
      })
    },
    listScroll() {
      // 参与用户 列表滚动监听
      let parent = this.$refs.joinList;
      let child = this.$refs.joinListItems;
      // console.log("ele");
      // console.log(parent.scrollTop);
      // console.log(child.clientHeight); // 257
      if(child.clientHeight - parent.scrollTop - 257 < 100) {
        console.log("到底了");
      } else {
        console.log("没到底");
      };
    },
    joinPeoplePopupEnter() {
      this.$refs.joinList.addEventListener("scroll", this.listScroll, true);
    },
    joinPeoplePopupClose() {
      this.$refs.joinList.removeEventListener("scroll", this.listScroll, true);
    },
    showJoinPeople() {
      this.joinPeoplePopup = true;
      // console.log(this.$refs.joinList)
    },
    changeJoinType() {
      if (this.joinType == 1) {
        this.joinType = 2;
      } else {
        this.joinType = 1;
      }
    }
  }
};
</script>

<style lang="scss">
@import "../assets/style/home/home.min.css";
</style>
