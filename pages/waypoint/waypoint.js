// waypoint.js
const Api = require('../../utils/api.js');
const App = getApp();
const Util = require('../../utils/util.js');
const formatTime = Util.formatTime;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    waypoint: null,
    replies: {
      recommender_count: 0,
      recommenders: [],
      comments: [],
      comment_count: 0
    },
    title: '',
    windowWidth: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    const that = this;
    const tripId = options.tripId;
    const waypointId = options.waypointId;
    this.setData({
      windowWidth: App.globalData.windowWidth
    });
    this.getWayDetails(tripId, waypointId);
  },

  getWayDetails(tripId, waypointId) {
    const that = this;
    Api.getWaypointInfoByID({
      query: {
        tripId,
        waypointId
      },
      success: (res) => {
        
        const waypoint = res.data;
        this.setData({
          title: waypoint.trip_name,
          waypoint
        });
        if (waypoint.comments > 0) {
          that.getWaypointReplies(tripId, waypointId);
        }
      }
    });
  },

  getWaypointReplies(tripId, waypointId) {
    const self = this;
    Api.getWaypointReplyByID({
      query: {
        tripId,
        waypointId,
      },
      success: (res) => {
        const replies = res.data;
        replies.comments.map((reply) => {
          const item = reply;
          item.date_added = formatTime(new Date(item.date_added * 1000), 2);
          return item;
        });
        self.setData({
          replies,
        });
      },
    });
  },

  gotoUser(e) {
    const userId = e.target.dataset.id;
    wx.navigateTo({
      url: `../user/user?id=${userId}`,
    });
  },
  previewImage(e) {
    const url = e.currentTarget.dataset.src;
    wx.previewImage({
      current: url,
      urls: [url],
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