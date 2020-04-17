const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({"message": "Welcome to lukaszek-czyta-api"});
});

require('./app/routes/routes.js')(app);

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});