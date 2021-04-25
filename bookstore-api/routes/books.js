const express = require('express');
/**
 * @swagger
 *  components:
 *    schemas:
 *      Book: 
 *        type: object
 *        required: 
 *          - title
 *          - description
 *          - price
 *          - state
 *          - authorId
 *          - img
 *        properties:
 *          id:
 *            type: number
 *            description: id autogenerado
 *          title:
 *            type: string
 *            description: title of book
 *          description:
 *            type: string
 *            description: description of book 
 *          price:
 *            type: number
 *            description: price of book 
 *          state:
 *            type: boolean
 *            description: state of book (activo / inactivo)
 *          authorId:
 *            type: number
 *            description: id of author
 *          img:
 *            type: String
 *            description: image of book
 *        example:
 *          title: Java
 *          description: Programming Java
 *          price: 40.00
 *          state: true
 *          authorId: 1
 *          img: book.jpg
 *          
 */
const app = express();
const { getBooks, getBookById, addBook, updateBook, deleteBook } = require('../services/BookService');

/**
 * @swagger
 * /books:
 *  get:
 *    tags:
 *      - Books
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: from
 *        type: number
 *      - in: query
 *        name: limit
 *        type: number 
 *    responses:
 *      '200':
 *        description: list of books paginations
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Book'
 *      '400':
 *        description: Error
 */
app.get("/books", async (req, res) => {
    try {
      let from = req.query.from || 0;
      from = Number(from);
      let limit = req.query.limit || 5;
      limit = Number(limit);
      const attributes = ['id', 'title', 'description', 'price', 'authorId','img'];
      return res.json(await getBooks(from, limit, null, attributes));
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e.message,
      });
    }    
  });

/**
 * @swagger
 * /books/{bookId}:
 *  get:
 *    tags:
 *      - Books
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: bookId
 *        type: number
 *        required: true
 *    responses:
 *      '200':
 *        description: get book by Id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Book'
 *      '404':
 *        description: Error
 */
// GET (obtener un book por su id)
app.get("/books/:bookId", async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const book = await getBookById(bookId);
      return res.json(book);
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: e.message });
    }
  });

/**
 * @swagger
 * /books:
 *  post:
 *    tags:
 *      - Books
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      '201':
 *        description: author creado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 */
//POST
app.post('/books', async (req, res) => {
    console.log(req.body);
    try{
        const body = req.body;
        const book = await addBook(body);        
        return res.status(201).json(book);
    }catch(e){
        console.log(e);
        res.status(400).json({
            message: e.message
        });
    }    
})

/**
 * @swagger
 *
 * /books/{bookId}:
 *      put:
 *          tags:
 *              - Books
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: bookId
 *                type: number 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Book'
 *          responses:
 *              '200':
 *                  description: book created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Book'
 *              '400':
 *                  description: Error
 */
// PUT // UPDATE (actualizar un book)
app.put("/books/:bookId", async (req, res) => {
  console.log(req.body);
    try {
      const bookId = req.params.bookId;
      let body = req.body;
      const book = await updateBook({ bookId: bookId, ...body });
      return res.json(book);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  });

/**
 * @swagger
 *
 * /books/{bookId}:
 *      delete:
 *          tags:
 *              - Books
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: bookId
 *                type: number 
 *          responses:
 *              '200':
 *                  description: book delete
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Book'
 *              '400':
 *                  description: Error
 */
// DELETE (eliminar un book)
app.delete("/books/:bookId", async (req, res) => {
  try {
    let bookId = req.params.bookId;
    const bookDeleted = await deleteBook(bookId);
    return res.status(204).json({
      book: bookDeleted
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
});

module.exports = app;