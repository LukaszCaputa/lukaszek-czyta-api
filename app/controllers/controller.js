const mysql = require('mysql');
const secret = require('../secret.js');


const connection = mysql.createConnection({
    host: secret.host,
    user: secret.user,
    password: secret.password,
    database: secret.database
});

connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected with mysql database...')
})

exports.create = (req, res) => {
    /* Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Title can not be empty"
        });
    }

    var params = req.body;
    console.log(params);

    connection.query("INSERT INTO d_book SET ? ", params,
        function (error, results, fields) {
            if (error) throw error;
            return res.send({
                data: results,
                message: 'New entry has been created successfully.'
            });
        });*/
};

exports.getAll = (req, res) => {
    connection.query('select * from d_book',
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

exports.get = (req, res) => {

    connection.query('select * from d_book where Id=?',
        [req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Entry description can not be empty"
        });
    }

    console.log(req.params.id);
    console.log(req.body.description);
    connection.query('UPDATE `d_book` SET `title`=?,`author`=? where `id`=?',
        [req.body.any, req.body.author, req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

exports.invalidate = (req, res) => {
    console.log(req.body);
    connection.query('DELETE FROM `d_book` WHERE `Id`=?', 
        [req.body.id], function (error, results, fields) {
            if (error) throw error;
            res.end('Record has been deleted!');
    });
};