<template>
  <div class="home">
    <div class="top-img">
      <img class="img" src="../assets/images/top.png" alt />
    </div>
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
      <div
        class="join-btn"
        @touchstart="gotouchstart"
        @touchmove="gotouchmove"
        @touchend="gotouchend"
      >
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
      :style="{ height: `${joinPeoplePopupHeight}px` }"
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
          <audio :src="audioSrc" autoplay class="audioPlayer" id="audioPlayer" ref="audioPlayer"></audio>
          <div class="join-list" ref="joinList" v-if="joinList.length != 0">
            <van-pull-refresh v-model="listDownLoading" @refresh="listDownOnLoad">
              <van-list
                v-model="listUpLoading"
                :finished="listUpFinished"
                finished-text="没有更多了"
                @load="listUpOnLoad"
              >
                <div class="item van-clearfix" v-for="item in joinList" :key="item.id">
                  <div class="pull-left">
                    <div class="avatar">
                      <img class="img" :src="item.avatar" alt srcset />
                    </div>
                    <div class="info">
                      <div class="name">{{item.name}}</div>
                      <div class="text" v-if="item.text">{{item.text}}</div>
                      <div class="voice" v-else>
                        <div class="bubble" @click="voicePlay($event, item)">
                          <img class="img" :src="voiceIcon" alt />
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
                </div>
              </van-list>
            </van-pull-refresh>

            <!-- <ul ref="joinListItems">
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
            </ul>-->
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
    <joinDialog :joinDialog="joinDialog" @joinConfirm="joinSubmit" @joinClose="joinCloser"></joinDialog>
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
import wx from "weixin-js-sdk";
import BenzAMRRecorder from "benz-amr-recorder";

import followDialog from "@/components/followDialog.vue"; // 关注弹窗
import joinDialog from "@/components/joinDialog.vue"; // 参与活动提示弹窗
import wainingDialog from "@/components/wainingDialog.vue"; // 中奖领取弹窗
import resultDialog from "@/components/resultDialog.vue"; // 领奖结果弹窗
import cashDialog from "@/components/cashDialog.vue"; // 红包提现弹窗

import { Popup, List, PullRefresh } from "vant";

// 用户授权，获取 code
import authorize from "@/authorize";

export default {
  name: "home",
  components: {
    // HelloWorld
    "van-popup": Popup,
    "van-list": List,
    "van-pull-refresh": PullRefresh,
    followDialog,
    joinDialog,
    wainingDialog,
    resultDialog,
    cashDialog
  },
  data() {
    return {
      amr: null,  // amr-js 解码器
      activityData: {},
      joinPeoplePopup: false, // 参与弹窗
      joinPeoplePopupHeight: 320,
      joinType: "1", // 1-全部；2-只看我
      joinList: [
        {
          id: 1,
          avatar:
            "https://teststatic.xingchen.cn/image/aowp/qpwf/bwwf/psll/aowpqpwfbwwfpsll.png",
          name: "荒原",
          text: "",
          // src: 'http://qiniu.xingchen.cn/20191106/7fd08c1f2a667c0291618d126471ddde.mp3',
          src: "http://qiniu.xingchen.cn/testamr/bi8dYHtPXrI_WJWPxOj4OM5INRTYGeo2HE0aZL9KOwgGUAGqnSEBemaoSwSPLQHL.amr",
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
      audioSrc: "",
      audioCurrent: "",
      audioCurrentTarget: "",
      voiceIcon: require("../assets/images/voice.png"),
      voicePlayGif: require("../assets/images/voice_play.gif"),
      listUpLoading: false, // 参与用户列表 - 上拉刷新
      listUpFinished: false, // 参与用户列表 - 上拉刷新完成
      listDownLoading: false, // 参与用户列表 - 下拉刷新
      followDialog: {
        // 关注弹窗
        show: false,
        method: 1, // 1- 强制；2-引导
        type: 1, // 1-语音；2-文字
        params: {}
      },
      joinDialog: {
        // 参与活动提示弹窗
        show: false,
        type: 1 // 1-今天没机会了；2-活动攻略；3-积分不够，改天再玩；4-分享
      },
      wainingDialog: {
        // 中奖领取弹窗
        show: false,
        type: 1 // 1-实物；2-积分；3-红包；
      },
      resultDialog: {
        // 领奖结果弹窗
        show: false,
        type: 2 //  1-实物；2-积分；3-红包自动发放；4-红包手动领取
      },
      cashDialog: {
        // 红包提现弹窗
        show: false,
        allAmount: "0.01" // 全部余额
      },
      shareTipsOverlay: false, // 分享指示提示
      timeOutEvent: 0 // 按钮长按定时器
    };
  },
  created() {},
  mounted() {
    // let data = {
    //   id: 1111
    // };
    // this.$api.home.index(data)
    // .then(res => {
    //   console.log(res)
    // });
    // this.$api.home.list(data)
    // .then(res => {
    //   console.log(res)
    // });
  },
  methods: {
    getWxConfig() {
      let url = location.href.split("#")[0]; //获取锚点之前的链接
      let data = {
        url: url
      };
      this.$api.home.getConfig(data).then(res => {
        this.wxInit(res.data.data);
      });
    },
    wxInit(res) {
      // 微信 JDK 初始化
      let links = location.host + "/#/";
      let title = "口令红包";
      let desc = "详情";
      let imgUrl = "img";
      wx.config({
        debug: true,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"]
      });
      wx.ready(function() {
        //需在用户可能点击分享按钮前就先调用
        /* 自定义“分享给朋友”及“分享到QQ”按钮的分享内容 */
        wx.updateAppMessageShareData({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl, // 分享图标
          success: function() {
            // 设置成功
          }
        });
        /* 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容 */
        wx.updateTimelineShareData({
          title: "", // 分享标题
          link: "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: "", // 分享图标
          success: function() {
            // 设置成功
          }
        });
      });
    },
    followSubmit(val) {
      // 关注弹窗点击确定
      console.log(val);
      if (val.method == 1) {
        // 强制关注
        if (val.type == 1) {
          // 强制关注-语音
          console.log("强制关注-语音");
        } else {
          // 强制关注-文字
          console.log("强制关注-文字");
        }
      } else {
        // 引导关注
        if (val.type == 1) {
          // 引导关注-语音
          console.log("引导关注-语音");
        } else {
          // 引导关注-文字
          console.log("引导关注-文字");
        }
      }
      this.followDialog.show = false;
    },
    joinSubmit(val) {
      // 参加活动 弹窗 关闭
      if (val.type == 4) {
        this.shareTipsOverlay = true;
      }
      this.joinDialog.show = false;
    },
    joinCloser(val) {
      this.joinDialog.show = false;
    },
    wainingSubmit(val) {
      // 获奖领取弹窗 确定
      console.log(val);
      this.wainingDialog.show = false;
    },
    resultSubmit(val) {
      // 获奖结果弹窗 关闭
      console.log(val);
      this.resultDialog.show = false;
    },
    cashSubmit(val) {
      // 红包提现弹窗
      console.log(val);
      this.cashDialog.show = false;
    },
    openStrategy() {
      // 打开活动攻略
      this.joinDialog.type = 2;
      this.joinDialog.show = true;
    },
    openShare() {
      // 打开分享好友弹窗
      this.joinDialog.type = 4;
      this.joinDialog.show = true;
    },
    toPrize() {
      // 跳转到 我的奖品
      this.$router.push({
        path: "/prize"
      });
    },
    listUpOnLoad() {
      // 列表上拉刷新
      // const self = this;
      // console.log("listUpOnLoad");
      // let later = setTimeout(() => {
      //   self.listUpLoading = false;
      //   let arr = [{id:1,avatar:"https://teststatic.xingchen.cn/image/aowp/qpwf/bwwf/psll/aowpqpwfbwwfpsll.png",name:"荒原",text:"红鲤鱼说他家的李屡屡比绿鲤鱼家的吕里里绿",time:"44``",num:"4.6",date:"2019-09-17 09:10"},{id:2,avatar:"https://teststatic.xingchen.cn/image/aowp/qpwf/bwwf/psll/aowpqpwfbwwfpsll.png",name:"荒原",text:"红鲤鱼说他家的李屡屡比绿鲤鱼家的吕里里绿",time:"44``",num:"2.8",date:"2019-09-17 09:10"},{id:3,avatar:"https://teststatic.xingchen.cn/image/aowp/qpwf/bwwf/psll/aowpqpwfbwwfpsll.png",name:"荒原",text:"红鲤鱼说他家的李屡屡比绿鲤鱼家的吕里里绿",time:"44``",num:"5.3",date:"2019-09-17 09:10"},{id:4,avatar:"https://teststatic.xingchen.cn/image/aowp/qpwf/bwwf/psll/aowpqpwfbwwfpsll.png",name:"荒原",text:"红鲤鱼说他家的李屡屡比绿鲤鱼家的吕里里绿",time:"44``",num:"8.1",date:"2019-09-17 09:10"},{id:5,avatar:"https://teststatic.xingchen.cn/image/aowp/qpwf/bwwf/psll/aowpqpwfbwwfpsll.png",name:"荒原",text:"红鲤鱼说他家的李屡屡比绿鲤鱼家的吕里里绿",time:"44``",num:"3.2",date:"2019-09-17 09:10"}];
      //   let temp = self.joinList;
      //   let result = [...temp, ...arr];
      //   self.joinList = result;
      //   clearTimeout(later)
      // }, 500);
    },
    listDownOnLoad() {
      // 列表下拉刷新
      const self = this;
      console.log("listDownOnLoad");
      let later = setTimeout(() => {
        self.listDownLoading = false;
        clearTimeout(later);
      }, 500);
    },
    joinPeoplePopupEnter() {
      /* 参与列表 打开后 */
    },
    joinPeoplePopupClose() {
      /* 参与列表 关闭后 */
    },
    voicePlay(e, item) {
      // 播放音频
      let target = e.target || e.srcElement;
      this.audioCurrentTarget = target;
      if (this.audioCurrent.id == item.id) {
        this.amr.stop();
      } else {
        // this.audioSrc = item.src;
        this.amr = new BenzAMRRecorder();
        this.amr.initWithUrl(item.src).then(() => {
          this.amr.play();
          console.log("语音开始播放！");
          console.log(`语音时长：${this.amr.getDuration()}秒`);
        });
        this.amr.onStop(() => {
          this.audioCurrentTarget.firstElementChild.src = this.voiceIcon;
          this.amr = null;
          this.audioCurrent = "";
          console.log("语音结束播放！");
        });
        this.audioCurrent = item;
        target.firstElementChild.src = this.voicePlayGif;
      };
    },
    showJoinPeople() {
      this.joinPeoplePopup = true;
      // console.log(this.$refs.joinList)
    },
    changeJoinType() {
      // 参与列表： 1-全部; 2-只看自己
      if (this.joinType == 1) {
        this.joinType = 2;
      } else {
        this.joinType = 1;
      }
    },
    gotouchstart() {
      let timeOutEvent = this.timeOutEvent;
      clearTimeout(timeOutEvent); //清除定时器
      timeOutEvent = 0;
      timeOutEvent = setTimeout(() => {
        console.log(this.activityData);
        // if(!num){
        //   // 判断今天是否还有参加次数
        //   return;
        // } else {
        
        // };
      //   followDialog: {
      //   // 关注弹窗
      //   show: false,
      //   method: 1, // 1- 强制；2-引导
      //   type: 1, // 1-语音；2-文字
      //   params: {}
      // },
        // 玩法：1-语音；0-文字
        if(this.activityData.ext_type == 1) {
          // 语音
          this.followDialog.type = '1';
        } else {
          // 文字
          this.followDialog.type = '2';
        };
        if(this.activityData.force == 1) {
          // 强制
          this.followDialog.method = '1';
        } else {
          // 引导
          this.followDialog.method = '2';
        };
        this.followDialog.show = true;
      }, 600); //这里设置定时
    },
    //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    gotouchend() {
      let timeOutEvent = this.timeOutEvent;
      clearTimeout(timeOutEvent);
      if (timeOutEvent != 0) {
        //这里写要执行的内容（尤如onclick事件）
      }
    },
    //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gotouchmove() {
      let timeOutEvent = this.timeOutEvent;
      clearTimeout(timeOutEvent); //清除定时器
      timeOutEvent = 0;
    }
  },
  beforeDestroy() {
    this.amr = null;
  }
};
</script>

<style lang="scss">
@import "../assets/style/home/home.min.css";
</style>
