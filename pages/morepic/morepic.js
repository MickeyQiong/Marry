//logs.js
var Bmob = require('../../utils/Bmob-1.6.4.min.js')
const util = require('../../utils/util.js')

Page({
  data: {
    items : {}
  },
  lookImage: function(e) {
    var url = e.currentTarget.dataset.url
    wx.previewImage({
      urls: [url]
    })
  },
  onLoad:function(){
    var that = this
    const query = Bmob.Query("morepic");
    query.order("-updatedAt")
    query.find().then(res => {
      that.setData({
        items : res
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