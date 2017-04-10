var express=require('express');
var app = express();
var port=process.env.PORT || 3000;
var host=process.env.HOST || 'localhost';
var mongojs = require('mongojs');
var ca1 = [new Buffer("LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURoVENDQW0yZ0F3SUJBZ0lFV092UE56QU5CZ2txaGtpRzl3MEJBUTBGQURCRU1VSXdRQVlEVlFRREREbHoKYjNkcWFTNWtZV052YjJ4emRFQm5iV0ZwYkM1amIyMHRaalUxTkdSbE56YzNPV1poWVRBM05XRXpOelZqWWpFegpNV1JoWlRFMFpqWXdIaGNOTVRjd05ERXdNVGd6TURFMVdoY05NemN3TkRFd01UZ3dNREF3V2pCRU1VSXdRQVlEClZRUURERGx6YjNkcWFTNWtZV052YjJ4emRFQm5iV0ZwYkM1amIyMHRaalUxTkdSbE56YzNPV1poWVRBM05XRXoKTnpWallqRXpNV1JoWlRFMFpqWXdnZ0VpTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUtBb0lCQVFEUwpnR0x2OVFjWWpoejR4clZJU2RkWjBydisvVHNGMW5ScUllUmdxa3JVRVRVVTJpdW9IUVhXM1ZYZlNLM2NkZDBLClAzaWdIUG4vemM0MTVCUVF2alJaZk02YklUNzkwai8zNE1BM3QvbG1neldTSzBPYlVQWTUrdzNlSTVCckF6L1EKcVBRS002Q3Y5M0dCS0dhNGg1YmFEbEFKZ1BscC81MzU3T0FQbXJYV0xMb2Y5R0Z2SVRYZ3hFRWlUbDNyRGlwKwpsbUZUeU9zbDZVejBtY21KU0svSEhmQ3FpQkZmUnZyc2thT2I3OGI2S2V1ZS9Cd0FpR21EZjRUNlMxc04xYWk3CktSRjFpQXdHNXRERkF4NFpzZkp0WkVRVXZQdUk5bC84U1JtUitkaHAraVI5blgvTDVuaFRHdU44bjdrR0RjZ1EKN2hOWmhuaERWb1YxT05BbXdyZmhBZ01CQUFHamZ6QjlNQjBHQTFVZERnUVdCQlRjRzVyUWZ5TTJxT3h5NlBaWQpvcC9ycElWYWFEQU9CZ05WSFE4QkFmOEVCQU1DQWdRd0hRWURWUjBsQkJZd0ZBWUlLd1lCQlFVSEF3RUdDQ3NHCkFRVUZCd01DTUF3R0ExVWRFd1FGTUFNQkFmOHdId1lEVlIwakJCZ3dGb0FVM0J1YTBIOGpOcWpzY3VqMldLS2YKNjZTRldtZ3dEUVlKS29aSWh2Y05BUUVOQlFBRGdnRUJBTTRTUkNpVUpvbTY5VU1yMy9lMUZnd2JEU3lnRituUApFS3pscEhHeGxZcEFmREQ1bnVnY2NUdnBiRnJ0UmMxR09uUTdmWW1KZ0NqaGFreS9WWHV6ZTRWK3phSXBYTGkwCm44cU9idjBwd0syMXZzTDBBVU1sdWV5MnlYSEJ6N2kwYWxLK05aSndvbmlBZVljQ3V0Qm83WHZhOGlNRWFvRXUKM29sZ3MwUTlCNkxpNUpKTGt5d1pIWk9EbE15K2hPMDdCZUcwbWZwNkNiYVNnR2lHWmMvUTNJRVJXbFd2Q0ZCSwpQT1hSSGpaUVlGbGpJSnBWelY3S29oNkNMWTFTSmlVYk42eE5hYjdyMzE0ZUVEOTgxZW1saDliRmFweUdIUC82CjFGZitMVGdRSG1GMjFXU0xEMjFhR1IyTW80RklOSHBKem1TaHJheThrL1pxSWEvc0FvVmlUQTQ9Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K", 'base64')];

var details ={
	mongos: {
            ssl: true,
            sslValidate: true,
            //sslCA: "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURqekNDQW5lZ0F3SUJBZ0lFVi9wYS9EQU5CZ2txaGtpRzl3MEJBUTBGQURCSk1VY3dSUVlEVlFRRERENXAKYm01dmRtRjBiM0p6YVc1dGFYSmhZMnhsUUdkdFlXbHNMbU52YlMwNE4yTmpOell4TkRVek9UTXdNalZtWW1NNApZVGRqWkdVek1qVmhNakEwTWpBZUZ3MHhOakV3TURreE5EVTRNRFJhRncwek5qRXdNRGt4TkRBd01EQmFNRWt4ClJ6QkZCZ05WQkFNTVBtbHVibTkyWVhSdmNuTnBibTFwY21GamJHVkFaMjFoYVd3dVkyOXRMVGczWTJNM05qRTAKTlRNNU16QXlOV1ppWXpoaE4yTmtaVE15TldFeU1EUXlNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QQpNSUlCQ2dLQ0FRRUF4WEM1c1puUG14YkJqUHFyQk1hdmRzSFJtZUgwOGRuOEkwNzh0NjY3bU1rdHV1WWozWVRZCk9KVytMd2E0ZHhFSVgyV0poZGtWSmJ0K29XcFNwM3VnM1ZCRUtudFlrQ3JoVS9yWG5tZHlBeDdFL3l3YWJIL00KNDBlVkk2dmMxbmdqTkZHbmlhWXI1dzNWOGVyWTcyaGFQL2Y2aGdpb0JoSnViTnhZVVl6UklvcGRzQnZvQ1lONgp6YXd0bzF4UWRvOGRSc3hvRVlkVC9iUmdlczZKZE4xZWpCeTcwYmJlc3pINkE5Qk53K2t4aUV5NzlyRHROQ1p3CmEraGRyN0R5UzJuOEhiaVAyMnVKUm0zLzcvLy84aUtKNlNKbHhtOU5WVWFRU1dsaE44VlV3TDNBbDVYb3ZMbysKTmwvNWRneXVWVkFFRXdIQk84UTAxWGsxY0l6MDJzTE5yUUlEQVFBQm8zOHdmVEFkQmdOVkhRNEVGZ1FVeFh0dgpVMUN1RVlMcndLalZmdjY3amRWYi8ySXdEZ1lEVlIwUEFRSC9CQVFEQWdJRU1CMEdBMVVkSlFRV01CUUdDQ3NHCkFRVUZCd01CQmdnckJnRUZCUWNEQWpBTUJnTlZIUk1FQlRBREFRSC9NQjhHQTFVZEl3UVlNQmFBRk1WN2IxTlEKcmhHQzY4Q28xWDcrdTQzVlcvOWlNQTBHQ1NxR1NJYjNEUUVCRFFVQUE0SUJBUUNZUDUvUU5VaVdHQW04ZlQxUAo3ejlWL240dXEzRlFVa2l5QnplQ0ZFd0hZTERVNUg1ZUxzeUNSYThDbTJ1QVh5TGFPZHcwNWN6TGsrYXZ3WlRwCjNyMUtQSC8rcEhTcUVMb2tZdTNiNzByQzVEZWxZZ2dCcWNRbVhtaU1GOXR1eXk1aGEyNjJFcG1naXpKWE1tWkEKdWRIQUdLdGwvWHVrQ29SVnd6UEQrbURqNFNGZ09mOGJKK0hYQ0xGa2tLZ2JKTUlRY3lJU3RmVGNqV1gwUHVWawpEeWh3dDR4OWZtTUI4MEMrS1lYUUxqYmJHMGtZdGgzWHIzbGFLMFMzaUY3Z1QwQittQUd6K3FVZUlSNFhCQ01lCm1tL20vWVIzSDF1UnhSM2NmTzdmYmdDbVBpbzcrZ0VTWkNCMXIyUThCVmVMTG5rdUV4dUFEcEFhUUpqQmZ4TEgKSldLYwotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==",
           sslCA:ca1,
		   poolSize: 1,
           reconnectTries: 1
}
}
var db = mongojs('mongodb://admin:ISRTDGJQWYMZAMNJ@sl-us-dal-9-portal.6.dblayer.com:22672,sl-us-dal-9-portal.7.dblayer.com:22672/admin?ssl=true', ['retaillist'], details);
	var bodyParser=require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",'POST, GET, PUT, DELETE, OPTIONS');
  next();
});


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
