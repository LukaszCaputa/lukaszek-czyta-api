module.exports = (app) => {
    const controller = require('../controllers/controller.js');

    // Create a new entry
    app.post('/book/add', controller.create);

    // Retrieve all entries
    app.get('/book/get', controller.getAll);

    // Retrieve a single entry by id
    app.get('/book/get/:id', controller.get);

    // Update aan entry with id
    app.put('/book/update/:id', controller.update);

    // Invalidate an entry by id
    app.delete('/book/invalidate/:id', controller.invalidate);
}