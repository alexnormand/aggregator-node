var express   = require('express'),
    fs        = require('fs'),
    staticDir =  express['static'],
    app       = express.createServer();


var opts = {
    port: 3000,
    baseDir: './'
};


app.configure(function() {
    ['img', 'css', 'js', 'server'].forEach(function(dir) {
      app.use('/' + dir, staticDir(opts.baseDir + dir));
    });
    app.use(express.bodyParser());
  });


app.get('/', function(req, res) {
    fs.createReadStream(opts.baseDir + 'index.html').pipe(res);
});


app.get('/server/:quotesite', function(req, res) {
    res.json('quotesite');
});

    
app.listen(opts.port);
