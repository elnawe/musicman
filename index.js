var express = require('express');
var app = express();
var config = {
apiKey: "AIzaSyB-rUnUzB4yakmIujeByqc_yd3vmqHsoXE",
authDomain: "musicman-1339.firebaseapp.com",
databaseURL: "https://musicman-1339.firebaseio.com",
storageBucket: "musicman-1339.appspot.com",
};

app.use('/', express.static(__dirname + '/build'));
app.get('/', function (req ,res) {

});
app.listen(3000, function () {
    console.log('Musicman @ port 3000');
});
