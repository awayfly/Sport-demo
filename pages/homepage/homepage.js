//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    nickName: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loginStatus:false
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    if (wx.getStorageSync("Loginmessage") == '可以自动登陆') {
      that.setData({
        loginStatus: true,
        nickName: wx.getStorageSync("nickName")
      })
    }


   if (wx.getStorageSync("nickName")===""){
     that.setData({
       hasUserInfo: false,
       canIUse: wx.canIUse('button.open-type.getUserInfo'),
       loginStatus: false
     })
   }
    
  },
  getUserInfo: function (e) {
    var that = this;
    app.globalData.userInfo = e.detail.userInfo
    var nickname = e.detail.userInfo.nickName
    console.log(nickname)
    wx.setStorage({
      key: 'nickName',
      data: nickname,
    })
    
    this.setData({
      nickName: e.detail.userInfo.nickName,
      hasUserInfo: true
    })

    

        wx.request({
          url: 'https://xprogram.hczzz.club/sport/user',
          data: {
            thirdSession: wx.getStorageSync("thirdSession"),
            nickname: nickname
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          method: "POST",
          success: function (res1) {

            console.log("message值app HomePage  :  " + res1.data.message)
            console.log("nickName" + nickname + wx.getStorageSync("thirdSession"))

            if (that.userSessionReadyCallback) {
              that.userSessionReadyCallback(res1)
            }
          }
        })

    

   

  }
})
