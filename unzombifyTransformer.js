var Transform = require('stream').Transform;

module.exports = function(){

    var translate = function (word, match, newStr) {
        return word.replace(match, newStr);
    };

	var unzombify = function(word){
        word = translate(word, /hra/g, 'a');
        word = translate(word, /R{2}/g, 'r');
        word = translate(word, /rrrRr/g, 'o');
        word = translate(word, /rrrrRr/g, 'u');
        word = translate(word, /rRrr/g, 'i');
        word = translate(word, 'rr', 'e');
        word = translate(word, /zzZ/g, 'z');
        word = translate(word, /jJj/g, 'j');
        word = translate(word, /rh/g, 'r');
        return word;
	};

  	var parse = new Transform();

    parse._transform = function(data, encoding, done){
        console.log(data.toString());
        this.push(unzombify(data.toString()));
        done();
    };

  	return parse;
};
