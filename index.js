const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());

app.get('/', (req, res) => {
    res.json({"message": "Welcome to lukaszek-czyta-api"});
});

require('./app/routes/routes.js')(app);

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});