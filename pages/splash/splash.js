// pages/splash/splash.js
var Bmob = require('../../utils/Bmob-1.6.4.min.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    showModel: false,
    urls:{}
  },

  bindViewTap:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    // const query = Bmob.Query("splash");
    // query.find().then(res => {
    //   that.setData({
    //     urls:res
    //   })
    // })

    wx.getSetting({
      success: (res) => {
        //判断用户已经授权。不需要弹框
        if (!res.authSetting['scope.userInfo']) {
          that.setData({
            showModel: true
          })
        } else {
          wx.checkSession({
            success: function () {
              //session_key 未过期，并且在本生命周期一直有效
              that.setData({
                showModel: true
              })
            },
            fail: function () {
              // session_key 已经失效，需要重新执行登录流程
              that.setData({
                showModel: false
              })
            }
          })
        }
      }
    })
  },
  getUserInfo: function (e) {
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
    }),

    this.setData({
      userInfo: e.detail.userInfo,
      showModel:false,
    })

    const query = Bmob.Query('userInfo');
    query.set("avatarUrl", this.data.userInfo.avatarUrl)
    query.set("city", this.data.userInfo.city)
    query.set("country", this.data.userInfo.country)
    query.set("gender", this.data.userInfo.gender)
    query.set("language", this.data.userInfo.language)
    query.set("nickname", this.data.userInfo.nickName)
    query.set("province", this.data.userInfo.province)
    query.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    console.log(this.data.userInfo)
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