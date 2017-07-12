const APIURL = 'http://api.breadtrip.com'; 

const wxRequest = (param,url) => {
  wx.request({
    url: `${APIURL}/${url}`,
    method: param.method || 'GET',
    data: param.data || {},
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    success(res){
      if (param.success){
        param.success(res);
      }
    },
    fail(res){
      if (param.fail){
        param.fail(res);
      }
    },
    complete(res){
      if(param.complete){
        param.complete(res);
      }
    },
  });
};

// 热门游记
const getHotTripList = (params) => {
  wxRequest(params, `v2/index/`);
};

//
const getExplorePlaceList = (params) => {
  wxRequest(params, `destination/v3/`);
};

//
const getPlaceInfoByID = (params) => {
  wxRequest(params, `destination/place/${params.query.type}/${params.query.id}/`);
};

//
const getPlacePOIByID = (params) => {
  wxRequest(params, `destination/place/${params.query.type}/${params.query.id}/pois/${params.query.poiType}/`);
};

//
const getTripInfoByID = (params) => {
  wxRequest(params, `trips/${params.query.tripId}/waypoints/`);
};

//
const getPlaceTripByID = (params) => {
  wxRequest(params, `destination/place/${params.query.type}/${params.query.id}/trips/`);
};

//
const getUserInfoByID = (params) => {
  wxRequest(params, `users/${params.query.userId}/v2`);
};

//
const getWaypointInfoByID = (params) => {
  wxRequest(params, `trips/${params.query.tripId}/waypoints/${params.query.waypointId}/`);
};

//
const getWaypointReplyByID = (params) => {
  wxRequest(params, `trips/${params.query.tripId}/waypoints/${params.query.waypointId}/replies/`);
};

module.exports = {
  getHotTripList,
  getExplorePlaceList,
  getPlaceInfoByID,
  getPlacePOIByID,
  getTripInfoByID,
  getPlaceTripByID,
  getUserInfoByID,
  getWaypointInfoByID,
  getWaypointReplyByID,
};
