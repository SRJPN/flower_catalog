var http = require('http');
var fs = require('fs');
var queryString = require('querystring');

var addComment = function(name,comment){
	var now = new Date();
	var time = now.toLocaleTimeString();
	var date = now.toLocaleDateString();
	return "\n"+[time,date,name,comment].join();
};

var doComment = function(guestComment){
	var guestComment = queryString.parse(guestComment);
	var data = addComment(guestComment.name,guestComment.comment)
	fs.appendFile("comments.csv",data);
};

var listenerResponse =  function(req,res){
	console.log(req.url)
	if(req.url.match(/\/guest_book.html\?/)){
		doComment(req.url.slice(req.url.indexOf('?')+1))	
		res.statusCode = 302;
		res.setHeader("Location", "guest_book.html");
		res.end()
	}
	else{
		var file = req.url=="/"&&"./index.html"||"."+req.url
		fs.readFile(file,function(err,data){
			if(err){
				res.statusCode = 404;
				res.end("NOT FOUND");
				return;
			};
			res.end(data);
		})
	}
};

var server = http.createServer(listenerResponse);
server.listen(4000);