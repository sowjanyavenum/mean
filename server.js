var express=require('express');
var app = express();
var port=process.env.PORT || 3000;
var host=process.env.HOST || 'localhost';
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:LSZMWDRFIZZNDWCT@sl-us-dal-9-portal.5.dblayer.com:22501,sl-us-dal-9-portal.7.dblayer.com:22501/admin?ssl=true/retaillist', ['retaillist']);
var bodyParser=require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.get('/retaillist', function (req, res) {
  console.log('I received a GET request');
 db.retaillist.find(function(err,docs){
 	console.log(docs);
 	res.json(docs);
 });
  });
app.post('/retaillist',function(req,res){
console.log(req.body);
db.retaillist.insert(req.body,function(err,doc){
	res.json(doc);
});
});
app.delete('/retaillist/:id',function(req,res){
	var id= req.params.id;
	console.log(id);
	db.retaillist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});
app.get('/retaillist/:id',function(req,res){
	var id= req.params.id;
	console.log(id);
	db.retaillist.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});
app.put('/retaillist/:id',function(req,res){
	var id=req.params.id;
	console.log(req.body.name);
	 db.retaillist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, company: req.body.company, cost: req.body.cost}},
    new: true}, function (err, doc) {
      res.json(doc);
});
	});
app.listen(port,function(){
console.log("app running");
console.log("your app is runing at "+host+":"+port)
});
