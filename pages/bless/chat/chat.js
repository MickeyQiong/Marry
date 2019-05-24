// pages/chat/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
      }
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
      imageUrl: '../../../image/tab/a520.png',
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
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  foo: function () {
    var that = this;
    if (that.data.inputValue) {
      //留言内容不是空值

      var userInfo = that.data.userInfo;
      var name = userInfo.nickName;
      var face = userInfo.avatarUrl;
      var words = that.data.inputValue;

      const query = Bmob.Query('chat');
      query.set("nickname", name)
      query.set("avatarUrl", face)
      query.set("content", words)
      query.save().then(res => {
        wx.showToast({
          title: '发布成功！',
        })
        const query = Bmob.Query("chat");
        query.find().then(res => {
          that.setData({
            chatList: res
          })
        });
      }).catch(err => {
        console.log(err)
      })

    }
    that.setData({
      inputValue: ''//将data的inputValue清空
    });
    return;
  }
})