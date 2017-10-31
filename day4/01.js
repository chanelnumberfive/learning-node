/**
 * Created by Danny on 2015/9/23 17:13.
 */
var express = require("express");
//数据库引用
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var app = express();

//数据库连接的地址，最后的斜杠表示数据库名字
var shujukuURL = 'mongodb://localhost:27017/test';

app.get("/",function(req,res){
    //连接数据库，这是一个异步的操作
    MongoClient.connect(shujukuURL, function(err, db) {
        if(err){
            res.writeHead(404,{"content-type":"text/plain"});
			res.send("数据库连接失败");
        }else{
			res.writeHead(200,{"content-type":"text/plain"});
			res.write("恭喜，数据库已经成功连接 \n");
			db.collection("student").insertOne({"name":"哈哈"},function(err,result){
				if(err){
					res.send("数据库写入失败");
					return;
				}else{
					res.write("恭喜，数据已经成功插入");
					res.end();
					//关闭数据库
					db.close();
				}
			});	
		}
    });
});

app.listen(3000);