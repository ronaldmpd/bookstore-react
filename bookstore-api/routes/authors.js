const express = require('express');

/**
 * @swagger
 *  components:
 *    schemas:
 *      Author: 
 *        type: object
 *        required: 
 *          - name
 *          - age
 *          - nationality
 *          - state
 *        properties:
 *          id:
 *            type: number
 *            description: id autogenerado
 *          name:
 *            type: string
 *            description: name of author
 *          age:
 *            type: number
 *            description: age of author
 *          nationality:
 *            type: string
 *            description: nationality of author
 *          state:
 *            type: boolean
 *            description: estado del usuario (activo / inactivo)
 *        example:
 *          name: Pablo Meruda
 *          age: 45
 *          nationality: Chileno
 *          state: true
 */

const app = express();
const { getAuthors, getAuthorById, addAuthor, updateAuthor, deleteAuthor } = require('../services/AuthorService');

/**
 * @swagger
 * /authors:
 *  get:
 *    tags:
 *      - Authors
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
 *        description: list of authors paginados
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Author'
 *      '400':
 *        description: Error
 */
app.get("/authors", async (req, res) => {
    try {
      let from = req.query.from || 0;
      from = Number(from);
      let limit = req.query.limit || 5;
      limit = Number(limit);
      const attributes = ['id', 'name', 'age', 'nationality'];
      return res.json(await getAuthors(from, limit, null, attributes));
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e.message,
      });
    }    
  });

/**
 * @swagger
 * /authors/{authorId}:
 *  get:
 *    tags:
 *      - Authors
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: authorId
 *        type: number
 *        required: true
 *    responses:
 *      '200':
 *        description: get author by Id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Author'
 *      '404':
 *        description: Error
 */
// GET (obtener un author por su id)
app.get("/authors/:authorId", async (req, res) => {
    try {
      const authorId = req.params.authorId;
      const author = await getAuthorById(authorId);
      return res.json(author);
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: e.message });
    }
  });

/**
 * @swagger
 * /authors:
 *  post:
 *    tags:
 *      - Authors
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Author'
 *    responses:
 *      '201':
 *        description: author creado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Author'
 */
app.post('/authors', async (req, res) => {
    console.log(req.body);
    try{
        const body = req.body;
        const author = await addAuthor(body);        
        return res.status(201).json(author);
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
 * /authors/{authorId}:
 *      put:
 *          tags:
 *              - Authors
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: authorId
 *                type: number 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Author'
 *          responses:
 *              '200':
 *                  description: user created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Author'
 *              '400':
 *                  description: Error
 */
// PUT // UPDATE (actualizar un author)
app.put("/authors/:authorId", async (req, res) => {
  console.log(req.body);
    try {
      const authorId = req.params.authorId;
      let body = req.body;
      const author = await updateAuthor({ authorId: authorId, ...body });
      return res.json(author);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  });

/**
 * @swagger
 *
 * /authors/{authorId}:
 *      delete:
 *          tags:
 *              - Authors
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: authorId
 *                type: number 
 *          responses:
 *              '200':
 *                  description: author delete
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Author'
 *              '400':
 *                  description: Error
 */
// DELETE (eliminar un author)
app.delete("/authors/:authorId", async (req, res) => {
  try {
    let authorId = req.params.authorId;
    const authorDeleted = await deleteAuthor(authorId);    
    return res.status(204).json({
      author: authorDeleted
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
});

module.exports = app;