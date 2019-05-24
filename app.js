//app.js
// 微信小程序 appSecret : c460de0b72a3aa2ef088a840c421ebd6
//appid:wx421dea47343e892e
var Bmob = require('utils/Bmob-1.6.4.min.js')
var AppId = "wx421dea47343e892e"
var AppSecret = "c460de0b72a3aa2ef088a840c421ebd6"

Bmob.initialize(
  'a3da6b9547fe2798f6e7dce5b09c8726',
  'f234a87467c0e0aa9dfec5db244f1c1b'
)

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    // 登录
    wx.playBackgroundAudio({
      dataUrl: 'http://bmob-cdn-22119.b0.upaiyun.com/2018/10/29/83c9833740fb042480cda27ea5a3b77c.mp3',
    })
  },
  
  globalData: {
    userInfo: null,
    flag: null
  },
  onHide: function () {
    wx.stopBackgroundAudio();
  }
})