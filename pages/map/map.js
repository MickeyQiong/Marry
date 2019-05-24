//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    markers: [{
      iconPath: "/image/tab/location.png",
      id: 0,
      latitude: 45.946875,
      longitude: 128.048583,
      width: 50,
      height: 50,
      callout: {
        content: '点击图标开始导航',
        fontSize:16,
        color: '#ffffff',
        borderRadius: 5,
        bgColor: '#ff0000',
        borderColor:'#ffffff',
        padding: 10,
        display:'ALWAYS',
        textAlign: 'center',
      }
    }],
  },
  onLoad: function() {

    // 获取当前屏幕宽高
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })

    wx.showShareMenu({
      withShareTicket: true
    })
  },

  markertap(e) {
    wx.openLocation({
      latitude: 45.946875,
      longitude: 128.048583,
      scale: 18
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