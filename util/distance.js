// import Cookie from "js-cookie";

function getDistance(latA, longA, latB, longB) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(latB - latA);
    var dLong = rad(longB - longA);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(latA)) *
        Math.cos(rad(latB)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = (R * c) * 0.000621371; // meters to miles 
    return Math.round(100 * d)/100; 
  }

  const rad = function (x) {
    return (x * Math.PI) / 180;
  };
  
  export default getDistance;
  
