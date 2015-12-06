var Transform = require('stream').Transform;

module.exports = function(){

    var translate = function (word, match, newStr) {
        return word.replace(match, newStr);
     };

    var zombify = function(word){
        word = translate(word, /R/g, 'RR');
        word = translate(word, /r(?=\w)/g, 'RR'); //r in the middle of a word
        word = translate(word, /r$/g, 'rh');
        word = translate(word, /a|A/g, 'hra');
        word = translate(word, /(\?|\.|\!)\s([a-z]|[A-Z])/g, function(match) { return match.toUpperCase() });
        word = translate(word, /e|E/g, 'rr');
        word = translate(word, /i|I/g, 'rRrr');
        word = translate(word, /o|O/g, 'rrrRr');
        word = translate(word, /u|U/g, 'rrrrRr');
        word = translate(word, /z/g, 'zzZ');
        word = translate(word, /j/g, 'jJj');
        return word;
    };

  	var parse = new Transform();

  	parse._transform = function(data, encoding, done){
      console.log(data.toString());
    	this.push(zombify(data.toString()));
    	done();
  	};

  	return parse;
};
