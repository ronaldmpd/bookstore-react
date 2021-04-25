const express = require('express');

/**
 * @swagger
 *  components:
 *    schemas:
 *      Client: 
 *        type: object
 *        required: 
 *          - name
 *          - nit
 *          - state
 *        properties:
 *          id:
 *            type: number
 *            description: id autogenerado
 *          name:
 *            type: string
 *            description: name of client
 *          nit:
 *            type: number
 *            description: nit of client 
 *          state:
 *            type: boolean
 *            description: estado del usuario (activo / inactivo)
 *        example:
 *          name: Ronald
 *          nit: 12345 
 *          state: true
 */

const app = express();
const { getClients, getClientById, addClient, updateClient, deleteClient } = require('../services/ClientService');

/**
 * @swagger
 * /clients:
 *  get:
 *    tags:
 *      - Clients
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
 *        description: list of clients paginados
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Client'
 *      '400':
 *        description: Error
 */
app.get("/clients", async (req, res) => {
    try {
      let from = req.query.from || 0;
      from = Number(from);
      let limit = req.query.limit || 5;
      limit = Number(limit);
      const attributes = ['id', 'name', 'nit'];
      return res.json(await getClients(from, limit, null, attributes));
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e.message,
      });
    }    
  });

/**
 * @swagger
 * /clients/{clientId}:
 *  get:
 *    tags:
 *      - Clients
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: clientId
 *        type: number
 *        required: true
 *    responses:
 *      '200':
 *        description: get client by Id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Client'
 *      '404':
 *        description: Error
 */
// GET (obtener un client por su id)
app.get("/clients/:clientId", async (req, res) => {
    try {
      const clientId = req.params.clientId;
      const client = await getClientById(clientId);
      return res.json(client);
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: e.message });
    }
  });

/**
 * @swagger
 * /clients:
 *  post:
 *    tags:
 *      - Clients
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Client'
 *    responses:
 *      '201':
 *        description: client create
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Client'
 */
//POST
app.post('/clients', async (req, res) => {
    console.log(req.body);
    try{
        const body = req.body;
        const client = await addClient(body);        
        return res.status(201).json(client);
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
 * /clients/{clientId}:
 *      put:
 *          tags:
 *              - Clients
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: clientId
 *                type: number 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Client'
 *          responses:
 *              '200':
 *                  description: user created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Client'
 *              '400':
 *                  description: Error
 */
// PUT // UPDATE (actualizar un client)
app.put("/clients/:clientId", async (req, res) => {
  console.log(req.body);
    try {
      const clientId = req.params.clientId;
      let body = req.body;
      const client = await updateClient({ clientId: clientId, ...body });
      return res.json(client);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  });

/**
 * @swagger
 *
 * /clients/{clientId}:
 *      delete:
 *          tags:
 *              - Clients
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: clientId
 *                type: number 
 *          responses:
 *              '200':
 *                  description: client delete
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Client'
 *              '400':
 *                  description: Error
 */
// DELETE (eliminar un client)
app.delete("/clients/:clientId", async (req, res) => {
  try {
    let clientId = req.params.clientId;
    const clientDeleted = await deleteClient(clientId);
    return res.status(204).json({
      client: clientDeleted
    });    
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
});

module.exports = app;