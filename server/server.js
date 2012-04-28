var express   = require('express'),
    fs        = require('fs'),
    staticDir = express['static'],
    parser    = require(__dirname + '/parser.js'),
    app       = express.createServer(),
    opts = {
        port: 3000,
        baseDir: __dirname + '/../'
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

app.get('/server/:sitename', function(req, res) {
    fs.readFile(__dirname + '/sites.json', function (err, data) {
        var quotesites = JSON.parse(data),
            quotesite  = quotesites[req.params.sitename];

        parser.parseQuoteSiteFeed(quotesite, function(json) {            
            res.charset = quotesite.encoding || 'utf-8';
            res.json(json, {
                'Cache-Control': 'max-age=420'
            });
        });
    });
});

app.listen(process.env['app_port']||opts.port);


