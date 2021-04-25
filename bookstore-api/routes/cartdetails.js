const express = require('express');
/**
 * @swagger
 *  components:
 *    schemas:
 *      CartDetail: 
 *        type: object
 *        required: 
 *          - quantity
 *          - amount
 *          - bookId 
 *          - cartId
 *        properties:
 *          id:
 *            type: number
 *            description: id autogenerado 
 *          quantity:
 *            type: number
 *            description: quantity of books 
 *          amount:
 *            type: number
 *            description: amount of book
 *          bookId:
 *            type: number
 *            description: id of book
 *          cartId:
 *            type: number
 *            description: id of cart
 *        example:
 *          quantity: 1
 *          amount: 40
 *          bookId: 1
 *          cartId: 1 
 */
const app = express();
const { getCartDetailById, getCartDetailByCartId, addCartDetail, updateCartDetail, deleteCartDetail } = require('../services/CartDetailService');

/**
 * @swagger
 * /cartdetails/{cartDetailId}:
 *  get:
 *    tags:
 *      - CartDetails
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: cartDetailId
 *        type: number
 *        required: true
 *    responses:
 *      '200':
 *        description: get cart by Id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/CartDetail'
 *      '404':
 *        description: Error
 */
// GET (obtener un cart por su id)
app.get("/cartdetails/:cartDetailId", async (req, res) => {
    try {
      const cartDetailId = req.params.cartDetailId;
      const cartDetail = await getCartDetailById(cartDetailId);
      return res.json(cartDetail);
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: e.message });
    }
  });

/**
 * @swagger
 * /cartdetails/cart/{cartId}:
 *  get:
 *    tags:
 *      - CartDetails
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: cartId
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
 *                $ref: '#/components/schemas/CartDetail'
 *      '400':
 *        description: Error
 */
  //Get CartDetails by CartId
  app.get("/cartdetails/cart/:cartId", async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const cart = await getCartDetailByCartId(cartId);
      return res.json(cart);
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: e.message });
    }
  });

/**
 * @swagger
 * /cartdetails:
 *  post:
 *    tags:
 *      - CartDetails
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CartDetail'
 *    responses:
 *      '201':
 *        description: cart row create
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CartDetail'
 */
//POST
app.post('/cartdetails', async (req, res) => {
    console.log(req.body);
    try{
        const body = req.body;
        const cartDetail = await addCartDetail(body);        
        return res.status(201).json(cartDetail);
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
 * /cartdetails/{cartDetailId}:
 *      put:
 *          tags:
 *              - CartDetails
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: cartDetailId
 *                type: number 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CartDetail'
 *          responses:
 *              '200':
 *                  description: cart row created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/CartDetail'
 *              '400':
 *                  description: Error
 */
// PUT // UPDATE (actualizar un cart)
app.put("/cartdetails/:cartDetailId", async (req, res) => {
  console.log(req.body);
    try {
      const cartDetailId = req.params.cartDetailId;
      let body = req.body;
      const cartDetail = await updateCartDetail({ cartDetailId: cartDetailId, ...body });
      return res.json(cartDetail);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message });
    }
  });


/**
 * @swagger
 *
 * /cartdetails/{cartDetailId}:
 *      delete:
 *          tags:
 *              - CartDetails
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: cartDetailId
 *                type: number 
 *          responses:
 *              '200':
 *                  description: cart row delete
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/CartDetail'
 *              '400':
 *                  description: Error
 */
// DELETE (eliminar un cartDetail)
app.delete("/cartdetails/:cartDetailId", async (req, res) => {
  try {
    let cartDetailId = req.params.cartDetailId;
    const cartDeleted = await deleteCartDetail(cartDetailId);
    return res.status(204).json({
      cartDetail: cartDeleted
    });    
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
});

module.exports = app;