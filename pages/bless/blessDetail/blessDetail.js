// pages/bless/index.js
var Bmob = require('../../../utils/Bmob-1.6.4.min.js')
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
    const query = Bmob.Query("zan");

    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        that.setData({
          userInfo: res.data
        })
      },
    }),
      // that.getPraiseList(),
    
    query.find().then(res => {
      that.setData({
        zanLog: res
      })
    });
  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    const query = Bmob.Query("zan");
    query.find().then(res => {
      that.setData({
        zanLog: res
      })
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  // 获取赞列表
  getPraiseList: function () {
    var that = this
    const query = Bmob.Query("zan");
    query.find().then(res => {
      that.setData({
        zanLog: res
      })
    });
  },
  loadMoreFriends: function (e) {
    wx.navigateTo({
      url: 'blessDetail/blessDetail'
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
  zan: function (event) {
    var that = this;

    var userInfo = that.data.userInfo;
    var name = userInfo.nickName;
    var face = userInfo.avatarUrl;

    const query = Bmob.Query('zan');
    query.set("nickname", name)
    query.set("avatarUrl", face)
    query.save().then(res => {
      wx.showModal({
        title: ':)',
        content: '感谢您的点赞祝福',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            const query = Bmob.Query("zan");
            query.find().then(res => {
              that.setData({
                zanLog: res
              })
            });
          }
        }
      })
    }).catch(err => {
      console.log(err)
    })
  }
})