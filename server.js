let express = require('express'),
    path = require('path'),
    cors = require('cors'),
    bodyParser = require('body-parser')


// Setting up express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());


// Create port
const port = process.env.PORT || 8080;

// Conectting port
const server = app.listen(port, () => {
    console.log('Port connected to: ' + port)
})

// Find 404 and hand over to error handler

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

app.use(express.static(`${__dirname}/build`))

app.use('/*', (req, res) => {
    // res.sendFile(path.join(__dirname.substr(0, __dirname.length - 12), 'build', 'index.html'))
    res.sendFile(`${__dirname}/build/index.html`)
})
