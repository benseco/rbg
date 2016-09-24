
import * as express from 'express';  

var app = express();

app.use(express.static('../client/public'));

app.get('/', function (req, res) {
   //res.sendFile(__dirname + "/" + "index.html");
	 res.end();
});

var server = app.listen(80, function () {

  var host = server.address().address
  var port = server.address().port

  //console.log("Example app listening at http://%s:%s", host, port)

});

