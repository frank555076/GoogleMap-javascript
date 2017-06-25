var express = require('express');
var app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);

var mqtt = require('mqtt');
var mongodb = require('mongodb');
var mongodbClient = mongodb.MongoClient;

var mongodbURI = 'mongodb://127.0.0.1/CsxFinal';
// var mongodbURI = 'mongodb://140.112.28.194/frankCSXFinal';
var deviceRoot = "demo/device/";
var collection, client;


mongodbClient.connect(mongodbURI, setupCollection);

// client = mqtt.connect('mqtt://broker.hivemq.com')

function setupCollection(err, db) {
    if (err) throw err;
    console.log("database connected");
    collection = db.collection("test_mqtt");
    client = mqtt.connect('mqtt://broker.hivemq.com');

    client.on('connect', () => {
        console.log("MQTT connected");
        client.subscribe(deviceRoot + '+');
    })

    client.on('message', insertEvent);
}

function insertEvent(topic, payload) {
    console.log("message received");
    var key = topic.replace(deviceRoot, '');

// 把PAYLOAD轉成JSON格式
    payload = JSON.parse(payload)

        console.log("socket connected");
        io.sockets.emit('location', { longitude: payload.longitude, latitude: payload.latitude });

    collection.update({ _id: key }, { $push: { events: { event: { received: payload, when: new Date() } } } }, { upsert: true },
        function(err, docs) {
            if (err) { console.log("Insert fail"); } // Improve error handling
        }
    )
    console.log("database updated");
}

// 啟動並等待連接
// app.listen(app.get('port'), function() {
//     console.log('app listening on port ' + app.get('port'));
// });

http.listen(app.get('port'), function(){
  console.log('listening on *:'+ app.get('port'));
});