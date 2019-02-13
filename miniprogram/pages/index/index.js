//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: '../../images/user-unlogin.png',
    userInfo:{},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {
    console.log("onload")
    this.onGetOpenid()
    this.onGetUserInfo()
  },
  uploadMessage:function(){
    wx.navigateTo({
      url: '../uploadMsg/uploadMsg',
    })
  },
  onGetUserInfo: function(e) {
       
    
    
  },

  onGetOpenid: function() {
    // 调用云函数
    console.log("itis new")
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log(res.result.userInfo.openId)
        // console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.userInfo.openId
       
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        
      }
    })
  },

  // 上传图片
  // doUpload: function () {
  //   // 选择图片
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function (res) {

  //       wx.showLoading({
  //         title: '上传中',
  //       })

  //       const filePath = res.tempFilePaths[0]
        
  //       // 上传图片
  //       const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
  //       wx.cloud.uploadFile({
  //         cloudPath,
  //         filePath,
  //         success: res => {
  //           console.log('[上传文件] 成功：', res)

  //           app.globalData.fileID = res.fileID
  //           app.globalData.cloudPath = cloudPath
  //           app.globalData.imagePath = filePath
            
  //           wx.navigateTo({
  //             url: '../storageConsole/storageConsole'
  //           })
  //         },
  //         fail: e => {
  //           console.error('[上传文件] 失败：', e)
  //           wx.showToast({
  //             icon: 'none',
  //             title: '上传失败',
  //           })
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       })

  //     },
  //     fail: e => {
  //       console.error(e)
  //     }
  //   })
  // },

})
