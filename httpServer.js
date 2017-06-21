// 載入 http 的模組
var http = require('http');
// 引用 File System 模組
var fs = require('fs');

var io = require('socket.io')(http);

// 設定 port 預設為 1337，若系統環境有設定則以系統環境設定為主
var port = process.env.PORT || 3000;

var url = require('url');
var path = require('path');

var file_content;

var webPath = 'public';

var server = http.createServer(function(req, res) {
    // req 是 request 本地端請求的訊息
    // res 是 response 主機回傳到本地端的訊息

    // 解析使用者要求的路徑名稱
    let url_path = url.parse(req.url);
    console.log('path:' + url_path);
    let pathname = url_path.pathname;
    console.log('pathname:' + pathname);

    // 判斷pathname是否為預設路徑
    if (pathname === "/" || pathname === "/index.htm") {
        pathname = 'index.html';
    }

    // __dirname 是程式的路徑
    // webPath 是公開的資料夾
    // pathname 是使用者要求的路徑名稱
    var filePath = path.join(__dirname, webPath, pathname);
    console.log('filePath:' + filePath);


    // 讀取檔案
    fs.readFile(filePath, 'utf8', function(err, content) {
        if (err) {
            console.log('Failed to read');
            // 若檔案讀取錯誤，回傳 404
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end();
            return;
        }
        // 將檔案內容傳給瀏覽器
        //res.writeHead(200, { 'Content-Type': 'text/' });
        res.write(content);
        res.end();
    })
});


var mqtt=require('mqtt');  
var mongodb=require('mongodb');
var mongodbClient=mongodb.MongoClient;

var mongodbURI = 'mongodb://127.0.0.1/CsxFinal';
var deviceRoot="demo/device/";
var collection,client;  

mongodbClient.connect(mongodbURI,setupCollection);

// client = mqtt.connect('mqtt://broker.hivemq.com')

function setupCollection(err,db) {  
  if(err) throw err;
  console.log("database connected");
  collection=db.collection("test_mqtt");
  client=mqtt.connect('mqtt://broker.hivemq.com');
  
  client.on('connect', () => {  
    console.log("MQTT connected")
    client.subscribe(deviceRoot+'+')
  })

  client.on('message', insertEvent);
}

function insertEvent(topic,payload) {  
console.log("message received");
var key=topic.replace(deviceRoot,'');
// console.log(payload.toString());

// 將payload從buffer檔轉成文字
payload = payload.toString();


// socket.io communication client-server
// var countdown = 1000;  
// setInterval(function() {  
//   countdown--;
//   io.sockets.emit('timer', { countdown: countdown });
// }, 1000);

io.sockets.on('connection', function (socket) {  
    // countdown = 1000;
    // io.sockets.emit('timer', { countdown: countdown });
    io.sockets.emit('location', { location: payload });
});


collection.update(  
  { _id:key },
  { $push: { events: { event: { received:payload, when:new Date() } } } },
  { upsert:true },
  function(err,docs) {
    if(err) { console.log("Insert fail"); } // Improve error handling
  }
  )
  console.log("database updated")
}

// 啟動並等待連接
server.listen(port);
console.log('Server running at http://127.0.0.1:' + port);