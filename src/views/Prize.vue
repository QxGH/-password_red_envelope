<template>
  <div class="prize">
    <div class="prize-header">
      <van-dropdown-menu active-color="#FF4800">
        <van-dropdown-item v-model="prizeType" :options="prizeTypeOption" />
        <van-dropdown-item v-model="prizeSource" :options="prizeSourceOption" />
      </van-dropdown-menu>
    </div>
    <div ref="mescroll" class="mescroll">
      <div class="prize-content">
        <ul class="prize-list">
          <li class="item">
            <div class="card-header">中奖时间：2019.12.23 23:26:58</div>
            <div class="card-body">
              <div class="goods-img-box">
                <img class="img" src alt />
              </div>
              <div class="goods-info">
                <div class="name">京东E卡 面值500元 卡密 超长有效超长有效超长有效超长有效超长有效</div>
                <div class="source">
                  奖品来源：
                  <span>刮刮乐</span>
                </div>
                <div class="type">
                  奖品类型：
                  <span>虚拟直充（话费直充）</span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button class="footer-btn orange-btn" type="button">立即领取</button>
              <button class="footer-btn gary-btn" disabled type="button">已领取</button>
              <button class="footer-btn orange-btn" type="button" @click="toCash">去提现</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem } from "vant";
import MeScroll from "mescroll.js";
import "mescroll.js/mescroll.min.css";
export default {
  name: "prize",
  components: {
    "van-dropdown-menu": DropdownMenu,
    "van-dropdown-item": DropdownItem,
    MeScroll
  },
  data() {
    return {
      prizeType: 0, // 全部奖品
      prizeSource: 0, // 奖品来源
      prizeTypeOption: [
        { text: "全部奖品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      prizeSourceOption: [
        { text: "奖品来源", value: 0 },
        { text: "好评排序", value: 1 },
        { text: "销量排序", value: 2 }
      ],
      mescroll: null, //mescroll实例对象
      dataList: [] //列表数据
    };
  },
  mounted() {
    this.mescroll = new MeScroll(this.$refs.mescroll, {
      down: {
        callback: this.downCallback,
      },
      up: {
        callback: this.upCallback, // 以下是一些常用的配置,当然不写也可以的.
				page: {
					num: 1, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
					size: 10, //每页数据条数,默认10
				},
				htmlNodata: '<p class="upwarp-nodata">—— 我也是有底线的 ——</p>',
				noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据; 避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
				toTop: {
					//回到顶部按钮
					src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
					offset: 1000, //列表滚动1000px才显示回到顶部按钮
				}
      }
    });
  },
  methods: {
    index(){
      let data = {

      };
      this.$api.prize.index(data)
      .then((res) => {
        console.log(res)
      })
    },
    getList(){
      let data = {

      };
      this.$api.prize.list(data)
      .then((res) => {
        console.log(res)
      })
    },
    downCallback(){
      let page = 1;
      // //请求的列表数据
      // let arr = response.data;
      // //如果是第一页需手动置空列表
      // if (page.num == 1) this.dataList = [];
      // //把请求到的数据添加到列表
      // this.dataList = this.dataList.concat(arr);
      // //数据渲染成功后,隐藏下拉刷新的状态
      // this.$nextTick(() => {
      //   this.mescroll.endSuccess(arr.length);
      // })
      console.log("down")
      this.mescroll.endErr();
    },
    upCallback(page){
      // this.$nextTick(() => {
      //   this.mescroll.endSuccess();
      // })
      console.log(page)
      console.log("up")
      this.mescroll.endErr();
      //this.mescroll.showNoMore();
    },
    toCash(){
      // 提现
      this.$router.push({
        path: '/',
        query: {
          type: 1
        }
      })
    }
  },
  beforeDestroy(){
    this.mescroll.destroy();
  }
};
</script>

<style lang="scss">
@import "../assets/style/prize/prize.min.css";
</style>