// trip.js
const Api = require('../../utils/api');
const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    trip: {},
    options: null,
    windowWidth: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const id = options.id;
    that.setData({
      options,
      windowWidth: App.globalData.windowWidth,
    });
    wx.showToast({
      title: '正在加载中...',
      icon: 'loading',
      duration: 10000
    });

    Api.getTripInfoByID({
      query: {
        tripId: id,
      },
      success: (res) => {
        const trip = res.data;
        that.setData({
          trip,
        });
        console.log(this.data.trip);
        wx.hideToast();
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    wx.setNavigationBarTitle({
      title: that.data.options.name,
    });
  },

  viewWaypoint: function (e) {
    const that = this;
    const dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../waypoint/waypoint?waypointId=${dataset.waypoint}&tripId=${that.data.trip.id}`,
    });
  },

  gotoUser(e) {
    const userId = e.target.dataset.id;
    wx.navigateTo({
      url: `../user/user?id=${userId}`,
    });
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