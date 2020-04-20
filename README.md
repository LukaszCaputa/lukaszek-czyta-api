# lukaszek-czyta-api

API for lukaszek-czyta

## Endpoint
TBA

## PORT
5000 

## API

### POST /book/add
Create a new entry

### GET /book/get
Retrieve all entries

### GET /book/get/:bookId
Retrieve a single entry by given id

### PUT /book/update/:bookId
Update an entry with given id

### DELETE /book/invalidate/:bookId
Invalidate an entry by given id

### POST /tag/add
Add tag

### GET /tag/get
Get tags

### GET /tag/get/:name
Get tag by name

### GET /tag2book/get/:bookId
Get tags for entry

### POST /tag2book/add/:tagId/:bookId
Add tag for entry