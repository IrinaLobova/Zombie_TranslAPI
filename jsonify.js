var Transform = require('stream').Transform;

module.exports = function(){
  var parse = new Transform();

  var jsonify = function(input) {
  	var output = { 'message' : input };
  	return JSON.stringify(output);
  };
  
  parse._transform = function(data, encoding, done){
    this.push(jsonify(data.toString()));
    done();
  };

  return parse;

};
