const express = require('express');
/**
 * @swagger
 *  components:
 *    schemas:
 *      Cart: 
 *        type: object
 *        required: 
 *          - total
 *          - state
 *          - clientId 
 *        properties:
 *          id:
 *            type: number
 *            description: id autogenerado 
 *          total:
 *            type: number
 *            description: total of books 
 *          state:
 *            type: number
 *            description: id of book
 *          clientId:
 *            type: number
 *            description: id of client
 *        example:
 *          total: 1
 *          state: true
 *          clientId: 1 
 */
const app = express();
const { getCarts, getCartById, getCartByClientId, addCart, updateCart, deleteCart } = require('../services/CartService');

/**
 * @swagger
 * /carts:
 *  get:
 *    tags:
 *      - Carts
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
 *        description: list of carts paginations
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Cart'
 *      '400':
 *        description: Error
 */
app.get("/carts", async (req, res) => {
    try {
      let from = req.query.from || 0;
      from = Number(from);
      let limit = req.query.limit || 5;
      limit = Number(limit);
      const attributes = ['id', 'total', 'state', 'clientId'];
      return res.json(await getCarts(from, limit, null, attributes));
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e.message,
      });
    }    
  });

/**
 * @swagger
 * /carts/{cartId}:
 *  get:
 *    tags:
 *      - Carts
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: cartId
 *        type: number
 *        required: true
 *    responses:
 *      '200':
 *        description: get cart by Id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Cart'
 *      '404':
 *        description: Error
 */
// GET (obtener un cart por su id)
app.get("/carts/:cartId", async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const cart = await getCartById(cartId);
      return res.json(cart);
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: e.message });
    }
  });

/**
 * @swagger
 * /carts/client/{clientId}:
 *  get:
 *    tags:
 *      - Carts
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: clientId
 *        type: number
 *        required: true
 *    responses:
 *      '200':
 *        description: list of carts paginations
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Cart'
 *      '400':
 *        description: Error
 */
  //Get Carts by ClientId
  app.get("/carts/client/:clientId", async (req, res) => {
    try {
      const clientId = req.params.clientId;
      const cart = await getCartByClientId(clientId);
      return res.json(cart);
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: e.message });
    }
  });

/**
 * @swagger
 * /carts:
 *  post:
 *    tags:
 *      - Carts
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Cart'
 *    responses:
 *      '201':
 *        description: cart row create
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Cart'
 */
//POST
app.post('/carts', async (req, res) => {
    console.log(req.body);
    try{
        const body = req.body;
        const cart = await addCart(body);        
        return res.status(201).json(cart);
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
 * /carts/{cartId}:
 *      put:
 *          tags:
 *              - Carts
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: cartId
 *                type: number 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Cart'
 *          responses:
 *              '200':
 *                  description: cart row created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Cart'
 *              '400':
 *                  description: Error
 */
// PUT // UPDATE (actualizar un cart)
app.put("/carts/:cartId", async (req, res) => {
  console.log(req.body);
    try {
      const cartId = req.params.cartId;
      let body = req.body;
      const cart = await updateCart({ cartId: cartId, ...body });
      return res.json(cart);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  });


/**
 * @swagger
 *
 * /carts/{cartId}:
 *      delete:
 *          tags:
 *              - Carts
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: cartId
 *                type: number 
 *          responses:
 *              '200':
 *                  description: cart row delete
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Cart'
 *              '400':
 *                  description: Error
 */
// DELETE (eliminar un cart)
app.delete("/carts/:cartId", async (req, res) => {
  try {
    let cartId = req.params.cartId;
    const cartDeleted = await deleteCart(cartId);
    return res.status(204).json({
      cart: cartDeleted
    });    
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
});

module.exports = app;