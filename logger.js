module.exports = function(request, response){
  var date = (new Date()).toString();
  //var method = request.method;
  var route = request.url;
  var status = response.statusCode;
  var useragent = request.headers['user-agent'];

  console.log(date + " " + route + " " + status + " " + useragent);
};
