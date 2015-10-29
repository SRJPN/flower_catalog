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
		var comment = addComment(x[1],x[2])
		fs.appendFile("comments.csv",comment);
		res.end(fs.readFileSync("./guest_book.html"))
	}
	else{
		res.end(fs.readFileSync('.'+req.url));
	}
};

var server = http.createServer(listenerResponse);
server.listen(4000);