var express    = require('express'),
    fs         = require('fs'),
    gzippo     = require('gzippo'),
    parser     = require(__dirname + '/parser.js'),
    quotesites = require(__dirname + '/sites.json'),
    app        = express.createServer(),
    opts = {
        port: 3000,
        baseDir: __dirname + '/../'
    };


app.configure(function() {

    ['img', 'css', 'js'].forEach(function(dir) {
	      app.use('/' + dir, gzippo.staticGzip(opts.baseDir + dir));
    });
    app.use('/get', gzippo.staticGzip(__dirname));
    app.use(express.bodyParser());
});

// sitename preconditions (e.g.: sitename === ^(tfln|mlia|fmylife)$
app.param('sitename', function(req,res, next, sitename) {
    var regex = new RegExp('^(' + Object.keys(quotesites).join('|') + ')$', 'g');

    if (regex.test(sitename)) {
        next();
    } else {
        next(new Error(sitename + ' does not exist!'));
    }

});
          

// Routes

app.get('/', function(req, res) {
    fs.createReadStream(opts.baseDir + 'index.html').pipe(res);
});

app.get('/get/:sitename', function(req, res) {
    var quotesite = quotesites[req.params.sitename];

    parser.parseQuoteSiteFeed(quotesite, function(json) {
        res.charset = quotesite.encoding || 'utf-8';
        res.json(json, {
            'Cache-Control': 'max-age=420'
        });
    });
});

app.listen(process.env['app_port'] || opts.port);


