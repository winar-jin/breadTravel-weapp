const App = getApp();
const Api = require('../../utils/api');
const Utils = require('../../utils/util');
const formatTime = Utils.formatTime;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    tripNotes: [],
    start: 0,
    windowHeight: App.globalData.windowHeight,
    windowWidth: App.globalData.windowWidth,
  },

  /**
   * 点击游记
   */
  travelNoteTap(e){
    let dataSet = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../trip/trip?id=${dataSet.id}&name=${dataSet.name}`,
    });
  },

  /**
   * 加载游记
   */
  loadMore(needRefresh) {
    const that = this;
    const loading = this.data.loading;
    if (loading) {
      return;
    }
    const data = {
      next_start: this.data.start,
    }
    this.setData({
      loading: true,
    });
    Api.getHotTripList({
      data,
      success: (res) => {
        let newTripNotes = res.data.data.elements;
        newTripNotes.map(item => {
          item.data[0].date_added = formatTime(new Date(item.data[0].date_added * 1000), 1);
          return item;
        });
        if (needRefresh) {
          wx.stopPullDownRefresh();
        } else {
          newTripNotes = that.data.tripNotes.concat(newTripNotes);
        }
        that.setData({
          tripNotes: newTripNotes,
        });
        const nextStart = res.data.data.next_start;
        that.setData({
          next_start: nextStart,
          loading: false
        });
        console.log(that.data.tripNotes[0].data[0]);
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadMore(true);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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