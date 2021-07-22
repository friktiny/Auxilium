const express = require('express');
const app = express();
var port = process.env.PORT || 8080

app.use(express.static(_dirname + '/public'));

app.get("/", function(req, res) {
  res.render('LICENSE');
})

app.listen(port, function() {
    console.log('App Running');
})
