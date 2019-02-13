// miniprogram/pages/uploadMsg/uploadMsg.js

const Promise = require('../../utils/bluebird.js');
const wechat = require('../../utils/wechat.js');
const util = require('../../utils/util.js');
const maxImagesCount = 3
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imageUploadTitle: '图片(1~3张)',
      sourceType: ['camera', 'album'], //上传图片的来源，相机/相册
      sizeType: ['compressed'],//上传前是否压缩，默认压缩
      maxCount: 1,//一次选择图片的数量
      full:false,
      //以上三个配置项详情请看小程序文档
      uploadedImagesPaths: [],//保存已上传的图片路径，也可以设置初始时就显示的图片
      uploadParams: {
        url: '',//后台接收上传图片的路径
        name: 'file',//后台依靠这个字段拿到文件对象
        formData: {}//这个字段可以设置传到后台的额外的参数
        //以上三个配置项详情请看小程序文档
      }
    
  },
  msgSubmit:function(options){
    console.log(options )
    this.checkMmsg(options)
  },
  
  chooseImage() {

    let data = this.data;
    wechat.chooseImage(data.sourceType, data.sizeType, data.maxCount).then(res => {
      this._addToUploadedPaths(res);
    }, e => {

      console.log(e);
    });
  },

    previewImage(e) {
    let current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.uploadedImagesPaths
    });
  },

    // setChooseImageCallback(cb){
    //     if(typeof cb == 'function'){
    //         this._chooseImageCb = cb;
    //     }
    //     else {
    //         throw 'setChooseImageCallback receives a "function" as argument';
    //     }
    // }
    _addToUploadedPaths(res) {
    let filePath = res.tempFilePaths[0];
    if (this._isUploadSuccess(res)) {
      // var pathes =  this.data.uploadedImagesPaths.push(filePath);
      var pathes = this.data.uploadedImagesPaths
      pathes.push(filePath)

      console.log(pathes)
      
      var imagesCount = this.data.uploadedImagesPaths.length;
      if (imagesCount == maxImagesCount) {
        this.setData({
          full:true
        })
        
      }
      console.log(this.data.uploadedImagesPaths.length);
      this.setData({
        uploadedImagesPaths:pathes
      });
    }else {
      console.error(resp);
    }
  },
    _isUploadSuccess(resp) {
    console.info('为了演示效果，直接 return true ，真实使用时，请写自己的判断逻辑');
    return true;
  },
  deleteImg:function(e){
    var path = e.currentTarget.dataset.src;
    var pathes = this.data.uploadedImagesPaths
    for(var i = 0;i<pathes.length;i++){
        if(path == pathes[i]){
          pathes.splice(i,1)
        }
    }
    this.setData({
      uploadedImagesPaths:pathes
    })
    if(this.data.uploadedImagesPaths.length<maxImagesCount){
      this.setData({
        full:false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})