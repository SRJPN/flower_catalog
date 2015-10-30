
var hide = function(){
	document.getElementById('animated').style.display = 'none';
	setTimeout("show()",1000)
};

var show = function(){
	document.getElementById('animated').style.display = 'inline';
};

var addDataTag = function(string){
	return ["<td>",string,"</td>"].join("");
};

var addDataTagToAll = function(string){
	var row_Taged_Line = string.split(",").map(addDataTag);
	return row_Taged_Line.join("\n")
};

var addRowTag = function(string,index){
	return ["<tr>\n",string,"\n</tr>\n"].join("")
}

var toHTML = function(string){
	var lines = string.split("\n").reverse();
	var data_Taged_Lines = lines.map(function(line){
		return addDataTagToAll(line);
	});
	var header = ["<table>","<tr>",
				  "<th>Name</th>",
				  "<th>Time</th>",
				  "<th>Date</th>",
				  "<th>Comment</th>",
				  "</tr>"].join("\n");
	return [header,data_Taged_Lines.map(addRowTag).join(""),"</table>"].join("\n")
}

var showComments = function(){
	get("./comments.csv",function(comments){
		getElementById('comments').append(toHTML(comments))
		
	})
}
