var http = require('http');
var fs = require('fs');

var addComment = function(name,comment){
	var date = new Date();
	return "\n"+[date,name,comment].join();
};

var listenerResponse =  function(req,res){
	console.log(req.url)
	if(req.url.match(/\/guest_book.html\?/)){
		var x = req.url.match(/\/guest_book.html\?name=(.*)\&comment=(.*)/)
		var name = x[1].replace('+'," ");
		var comment = x[2].replace(/\+/ig," ");
		var data = addComment(name,comment)
		fs.appendFile("comments.csv",data);
		res.end(fs.readFileSync("./guest_book.html"))
	}
	else{
		var file = req.url=="/"&&"/index.html"||req.url
		res.end(fs.readFileSync('.'+file));
	}
};

var server = http.createServer(listenerResponse);
server.listen(4000);