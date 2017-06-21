var express = require('express');
var app = express();

var io = require('socket.io')(http);

app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);

var mqtt = require('mqtt');
var mongodb = require('mongodb');
var mongodbClient = mongodb.MongoClient;

var mongodbURI = 'mongodb://127.0.0.1/CsxFinal';
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
        console.log("MQTT connected")
        client.subscribe(deviceRoot + '+')
    })

    client.on('message', insertEvent);
}

function insertEvent(topic, payload) {
    console.log("message received");
    var key = topic.replace(deviceRoot, '');
    // console.log(payload.toString());

    // 將payload從buffer檔轉成文字
    payload = payload.toString();


    // socket.io communication client-server
    // var countdown = 1000;  
    // setInterval(function() {  
    //   countdown--;
    //   io.sockets.emit('timer', { countdown: countdown });
    // }, 1000);

    io.sockets.on('connection', function(socket) {
        // countdown = 1000;
        // io.sockets.emit('timer', { countdown: countdown });
        io.sockets.emit('location', { location: payload });
    });


    collection.update({ _id: key }, { $push: { events: { event: { received: payload, when: new Date() } } } }, { upsert: true },
        function(err, docs) {
            if (err) { console.log("Insert fail"); } // Improve error handling
        }
    )
    console.log("database updated")
}

// 啟動並等待連接
app.listen(app.get('port'), function() {
    console.log('app listening on port ' + app.get('port'));
});