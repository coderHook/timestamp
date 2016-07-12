//This is the Timestamp Microservice Application
var express = require('express'),
    colors = require('colors');

var app = express();

app.use(express.static('public'));

app.get('/:date',function(req, res){
  var url = req.path.substr(1);

  function timeConverter(url){
    //Convierte unix --> naturalDate
    var naturalDate = new Date(url*1000);
    var months = ['January','February','March','April','May','June','July','August','September','Octtober',
    'November','December'];
    var year = naturalDate.getFullYear();
    var month = months[naturalDate.getMonth()];
    var day = naturalDate.getDate();

    var natural = month +' '+ day + ', ' + year;
    if(month == null || day == null || year == null){
      natural = null;
    }
    return natural;
  }

  function convDateToUnix(url){
    var months = ['January','February','March','April','May','June','July','August','September','Octtober',
    'November','December'];

    var str = url.replace(/\%20/g, ' ');
    var unixTime = (new Date(str).getTime() / 1000).toFixed(0)

    if(unixTime.match(/\b(^\d{1,3})/)){return unixTime}
    else{return null}

  }

var var1 = convDateToUnix(url);
var var2 = timeConverter(url);

//Let's check if we have to use a unix sentence or a natural sentence.
if(url.match(/\b(^\d{1,3})/)){ //Client has entered a unix date
  if( var2 === null){ res.send({'unix': null, 'natural': null});
    }else {res.send({'unix': url, 'natural': timeConverter(url)});}
}else {                         //Client has entered a natural date
  var str = url.replace(/\%20/g, ' ');
  if(var1 === null){res.send({'unix': null, 'natural': null});
}else
  res.send({'unix': convDateToUnix(url), 'natural': str});}
});

app.listen(8080);
console.log('Server running on port 8080 and https://timestamp-abel1987.c9users.io'.green);
