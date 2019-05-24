//index.js
//获取应用实例
var Bmob = require('../../utils/Bmob-1.6.4.min.js')
const app = getApp()

Page({
  data: {

    imgUrls: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    music_url:'https://bmob-cdn-22119.b0.upaiyun.com/2018/10/29/83c9833740fb042480cda27ea5a3b77c.mp3',
    userInfo:{},
    isPlayingMusic: true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../morepic/morepic'
    })
  },
  onLoad: function() {

    // 获取当前屏幕宽高
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
      }
    })
   /**
   * 获取本地缓存
   **/
   wx.getStorage({
     key: 'userInfo',
     success: (res) => {
       this.setData({
         userInfo:res.data
       })
     }
   })

  const query = Bmob.Query("homepic");
    query.order("-updatedAt")
    query.find().then(res => {
      this.setData({
        imgUrls : res
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    //console.log(that.data);
    return {
      title: '诚意邀请你参加我们的婚礼',
      imageUrl: '../../image/tab/a520.png',
      path: "pages/splash/splash",
      success: function (res) {
        wx.showToast({
          title: '分享成功',
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享取消',
        })
      }
    }
  },
})