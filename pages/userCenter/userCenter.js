// pages/userCenter/userCenter.js
Page({

  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index
    });
    // 若有切换页面等其他逻辑，也要确保路由、数据处理正确 
  },
  /**
   * 页面的初始数据
   */
  data:{
    userInfo: {},
    currentTab: 0
  },
  navigateToProfileEdit: function() {
    // 跳转到编辑页面，路径根据你的实际情况修改
    wx.navigateTo({
      url: '/pages/profileEdit/profileEdit'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadUserInfo();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  loadUserInfo: function() {
    // 实际项目中可能是从本地缓存或网络请求获取
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({ userInfo });
  }
})