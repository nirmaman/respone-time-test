const express = require('express')
cors = require('cors')
routers = require('./routes/routes.js');
const port = 3001;
const path = require ('path')
const app=express();

app.use('/main', express.static(path.join(__dirname, 'html/index.html')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'js')));

 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routers);
const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});