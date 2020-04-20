module.exports = (app) => {
    const controller = require('../controllers/controller.js');

    // Create a new entry
    app.post('/book/add', controller.createBook);

    // Retrieve all entries
    app.get('/book/get', controller.getAllBooks);

    // Retrieve a single entry by id
    app.get('/book/get/:bookId', controller.getBook);

    // Update an entry with id
    app.put('/book/update/:bookId', controller.updateBook);

    // Invalidate an entry by id
    app.delete('/book/invalidate/:bookId', controller.invalidateBook);

    // Add tag
    app.post('/tag/add/:tagName', controller.addTag);

    // Get tags
    app.get('/tag/get', controller.getTags);

    // Get tag by name
    app.get('/tag/get/:name',controller.getTagNyName);

    // Get tags for entry
    app.get('/tag2book/get/:bookId', controller.getTagForBook)

    // Add tag for entry
    app.post('/tag2book/add/:tagId/:bookId', controller.addTagToBook)
}