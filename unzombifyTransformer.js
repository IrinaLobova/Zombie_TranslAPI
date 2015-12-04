var Transform = require('stream').Transform;


module.exports = function(){

	var unzombify = function(word){
        word = this.translate(word, /hra/g, 'a');
        word = this.translate(word, /R{2}/g, 'r');
        word = this.translate(word, /rrrRr/g, 'o');
        word = this.translate(word, /rrrrRr/g, 'u');
        word = this.translate(word, /rRrr/g, 'i');
        word = this.translate(word, 'rr', 'e');
        word = this.translate(word, /zzZ/g, 'z');
        word = this.translate(word, /jJj/g, 'j');
        word = this.translate(word, /rh/g, 'r');
        return word;
	}

  	var parse = new Transform();

  	parse._transform = function(data, encoding, done){
    	this.push(unzombify(data));
    	done();
  	};

  	return parse;
};
