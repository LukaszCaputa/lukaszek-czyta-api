const mysql = require('mysql');
const secret = require('../secret.js');

const connection = mysql.createConnection({
    host: secret.host,
    user: secret.user,
    password: secret.password,
    database: secret.database
});

connection.connect(function (err) {
    if (err) throw err // TODO improve
    console.log('You are now connected with database...')
})

exports.createBook = (req, res) => {
    console.log(req.body);

    if (!req.body.title) {
        return res.status(400).send({
            message: "Title can not be empty"
        });
    }

    if (!req.body.author) {
        return res.status(400).send({
            message: "author can not be empty"
        });
    }

    if (!req.body.lead) {
        return res.status(400).send({
            message: "lead can not be empty"
        });
    }

    if (!req.body.notes) {
        return res.status(400).send({
            message: "notes can not be empty"
        });
    }

    if (!req.body.recommendation) {
        return res.status(400).send({
            message: "recommendation can not be empty"
        });
    }

    if (!req.body.read_date) {
        return res.status(400).send({
            message: "read_date can not be empty"
        });
    }

    connection.query("INSERT INTO d_book (title, author, lead, notes, recommendation, read_date) values (?,?,?,?,?,?) ", 
    [req.body.title, req.body.author, req.body.lead, req.body.notes, req.body.recommendation, req.body.read_date ],
        function (error, results, fields) {
            if (error) throw error;
            return res.send({
                data: results,
                message: 'New entry has been created successfully.'
            });
        });
};

exports.getAllBooks = (req, res) => {
    connection.query('select * from d_book',
        function (error, results, fields) {
            if (error) throw error;
            const data = {'books' : results}
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data));
        });
};

exports.getBook = (req, res) => {

    connection.query('select * from d_book where Id=?',
        [req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
        });
};

exports.updateBook = (req, res) => {
    console.log(req.params.bookId);

    // Validate Request
    if (!req.params.bookId) {
        return res.status(400).send({
            message: "bookId can not be empty"
        });
    }

    if (!req.body.title) {
        return res.status(400).send({
            message: "Title can not be empty"
        });
    }

    if (!req.body.author) {
        return res.status(400).send({
            message: "author can not be empty"
        });
    }

    if (!req.body.lead) {
        return res.status(400).send({
            message: "lead can not be empty"
        });
    }

    if (!req.body.notes) {
        return res.status(400).send({
            message: "notes can not be empty"
        });
    }

    if (!req.body.recommendation) {
        return res.status(400).send({
            message: "recommendation can not be empty"
        });
    }

    if (!req.body.read_date) {
        return res.status(400).send({
            message: "read_date can not be empty"
        });
    }
    
    connection.query('UPDATE `d_book` SET `title`=?,`author`=? where `id`=?',
        [req.body.any, req.body.author, req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

exports.invalidateBook = (req, res) => {
    console.log(req.params.bookId);
    connection.query('UPDATE `d_book` set `status`=9 WHERE `Id`=?', 
        [req.params.bookId], function (error, results, fields) {
            if (error) throw error;
            res.end('Record has been invalidated!');
    });
};

exports.addTag = (req, res) => {

    if (!req.params.tagName) {
        return res.status(400).send({
            message: "tagName can not be empty"
        });
    }
    let newTagName = req.params.tagName;
    

    connection.query("INSERT INTO s_tag (tag) values (?) ", newTagName,
        function (error, results, fields) {
            if (error) throw error;
            return res.send({
                data: results,
                message: 'New entry has been created successfully.'
            });
        });
};

exports.getTags = (req, res) => {
    connection.query('select * from s_tag',
    function (error, results, fields) {
        if (error) throw error;
        const data = {'tags' : results}
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    });
};

exports.getTagNyName = (req, res) => {
    connection.query('select * from s_tag where tag=?',
        [req.params.name],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

exports.getTagForBook = (req, res) => {
    if (!req.params.bookId) {
        return res.status(400).send({
            message: "bookId can not be empty"
        });
    }

    connection.query('select * from d_tag2book where book_id=?',
        [req.params.name],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

exports.addTagToBook = (req, res) => {
    if (!req.params.tagId) {
        return res.status(400).send({
            message: "tagId can not be empty"
        });
    }
    if (!req.params.bookId) {
        return res.status(400).send({
            message: "bookId can not be empty"
        });
    }

    let tagId = req.params.tagId;
    let bookId = req.params.bookId;
    console.log('connecting tag '+tagId+' with book '+bookId);

    connection.query("INSERT INTO d_tag2book (book_id, tag_id) values (?,?) ", [bookId,tagId],
        function (error, results, fields) {
            if (error) throw error;
            console.log(results)
            return res.send({
                data: results,
                message: 'New entry has been created successfully.'
            });
        });

};
