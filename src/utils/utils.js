export function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
  //compatibility for firefox and chrome
  var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  var pc = new myPeerConnection({
      iceServers: []
    }),
    noop = function () {},
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

  function iterateIP(ip) {
    if (!localIPs[ip]) onNewIP(ip);
    localIPs[ip] = true;
  }

  //create a bogus data channel
  pc.createDataChannel("");

  // create offer and set local description
  pc.createOffer().then(function (sdp) {
    sdp.sdp.split('\n').forEach(function (line) {
      if (line.indexOf('candidate') < 0) return;
      line.match(ipRegex).forEach(iterateIP);
    });

    pc.setLocalDescription(sdp, noop, noop);
  }).catch(function (reason) {
    // An error occurred, so handle the failure to connect
    console.log("err")
  });

  //sten for candidate events
  pc.onicecandidate = function (ice) {
    if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
}
export function formatDateTime(date) { //日期时间格式转换
  if (typeof (date) == "string") return date;
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var mm = date.getMinutes();
  mm = mm < 10 ? ('0' + mm) : mm;

  var s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s;

  return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
}
export function formatDateTime_chinese(date) { //日期时间格式转换
  if (typeof (date) == "string") return date;
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var mm = date.getMinutes();
  mm = mm < 10 ? ('0' + mm) : mm;

  var s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s;

  return y + "年" + m + "月" + d + "日 " + h + ":" + mm + ":" + s;
}
export  function getData(url) {
  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onload = () => {
          if (xhr.status == 200) {
              var result = JSON.parse(xhr.response)
              if (result.length === 0) {
                  var temp = null;
                  resolve(temp);
                  return false;
              }
              resolve(result);
          } else {
              reject(xhr.statusText);
          }

      };
      xhr.onerror = function () {
          reject(xhr.statusText);
      };
      xhr.send(null);
  })
}