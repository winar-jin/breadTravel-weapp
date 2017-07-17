// user.js
const Api = require('../../utils/api');
const App = getApp();
const Utils = require('../../utils/util');
const formatTime = Utils.formatTime;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    trips: [],
    user_info: null,
    userId: null,
    windowWidth: App.globalData.windowWidth,
    windowHeight: App.globalData.windowHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    const that = this;
    const userId = options.id || that.data.userId;
    Api.getUserInfoByID({
      query: {
        userId,
      },
      success: (res) => {
        
        const trips = res.data.trips;
        trips.map((trip) => {
          const item = trip;
          item.date_added = formatTime(new Date(item.date_added * 1000), 1);
          return item;
        });
        that.setData({
          trips,
          userId: res.data.userId,
          user_info: res.data.user_info,
        });
        wx.setNavigationBarTitle({
          title: res.data.user_info.name,
        });
      },
    });
  },

  viewTrip(e) {
    const dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../trip/trip?id=${dataset.id}&name=${dataset.name}`,
    });
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