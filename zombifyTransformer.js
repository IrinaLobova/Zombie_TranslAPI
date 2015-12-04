var Transform = require('stream').Transform;


module.exports = function(){

	var zombify = function(word){
        word = this.translate(word, /R/g, 'RR');
        word = this.translate(word, /r(?=\w)/g, 'RR'); //r in the middle of a word
        word = this.translate(word, /r$/g, 'rh');
        word = this.translate(word, /a|A/g, 'hra');
        word = this.translate(word, /(\?|\.|\!)\s([a-z]|[A-Z])/g, function(match) { return match.toUpperCase() });
        word = this.translate(word, /e|E/g, 'rr');
        word = this.translate(word, /i|I/g, 'rRrr');
        word = this.translate(word, /o|O/g, 'rrrRr');
        word = this.translate(word, /u|U/g, 'rrrrRr');
        word = this.translate(word, /z/g, 'zzZ');
        word = this.translate(word, /j/g, 'jJj');
        return word;
	}

  	var parse = new Transform();

  	parse._transform = function(data, encoding, done){
    	this.push(zombify(data));
    	done();
  	};

  	return parse;
};
