const request = require('supertest');
const { test } = require('../config/config.js');
const app = require('../server.js');

describe('Routes Endpoints', () => {
    //------- Authors
    it('You must create a Author', async () => {
        const res = await request(app).post('/authors').send({
            "name": "Pablo Meruda",
            "age": 45,
            "nationality": "Chileno",
            "state": true
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('It should return a list of Authors', async () => {
        const res = await request(app).get('/authors');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('authors');
        expect(res.body.authors).toHaveLength(1);
    });

    it('It must return a Author by his id', async () => {
        const authorId = 1;
        const res = await request(app).get(`/authors/${authorId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('You must be able to update a Author by id', async () => {
        const authorId = 1;
        const res = await request(app).put(`/authors/${authorId}`).send({
            "name": "Gonzalo Lema",
            "age": 45,
            "nationality": "Boliviano",
            "state": true
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name');
        expect(res.body.name).toBe('Gonzalo Lema');
    });

    //------ Books ------
    it('You must create a Book', async () => {
        const res = await request(app).post('/books').send({
            "title": "Java",
            "description": "Programming Java",
            "price": 40,
            "state": true,
            "authorId": 1
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('It should return a list of Books', async () => {
        const res = await request(app).get('/books');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('books');
        expect(res.body.books).toHaveLength(1);
    });

    it('It must return a Book by his id', async () => {
        const bookId = 1;
        const res = await request(app).get(`/books/${bookId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('You must be able to update a Book by id', async () => {
        const authorId = 1;
        const res = await request(app).put(`/books/${authorId}`).send({
            "title": "Node JS",
            "description": "Programming Node JS",
            "price": 40,
            "state": true,
            "authorId": 1
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title');
        expect(res.body.title).toBe('Node JS');
    });

    //---- Client ------
    it('You must create a Client', async () => {
        const res = await request(app).post('/clients').send({
            "name": "Mario Perez",
            "nit" : 123456,    
            "state":  true    
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('It should return a list of Clients', async () => {
        const res = await request(app).get('/clients');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('clients');
        expect(res.body.clients).toHaveLength(1);
    });

    it('It must return a Client by his id', async () => {
        const clientId = 1;
        const res = await request(app).get(`/clients/${clientId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('You must be able to update a Client by id', async () => {
        const clientId = 1;
        const res = await request(app).put(`/clients/${clientId}`).send({
            "name": "Ricardo Perez",
            "nit" : 123456,    
            "state":  true    
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name');
        expect(res.body.name).toBe('Ricardo Perez');
    });

    //------ Carts ------
    it('You must create a Cart', async () => {
        const res = await request(app).post('/carts').send({
            "total": 40,
            "status" : true,    
            "clientId":  1          
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('It should return a list of Carts', async () => {
        const res = await request(app).get('/carts');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('carts');
        expect(res.body.carts).toHaveLength(1);
    });

    it('It must return a Cart by his id', async () => {
        const cartId = 1;
        const res = await request(app).get(`/carts/${cartId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('It must return a Carts by his ClientId', async () => {
        const clientId = 1;
        const res = await request(app).get(`/carts/client/${clientId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('carts');
        expect(res.body.carts).toHaveLength(1);
    });

    it('You must be able to update a Cart by id', async () => {
        const cartId = 1;
        const res = await request(app).put(`/carts/${cartId}`).send({
            "total": 80,
            "status" : true,    
            "clientId":  1 
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('total');
        expect(res.body.total).toBe(80);
    });

    //------- CartDetails----------
    it('You must create a CartDetail', async () => {
        const res = await request(app).post('/cartdetails').send({
            "quantity": 1,
            "amount" : 40,    
            "bookId":  1,
            "cartId":  1             
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('It must return a CartDetail by Id', async () => {
        const cartDetailId = 1;
        const res = await request(app).get(`/cartdetails/${cartDetailId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('It must return a CartDetails by his CartId', async () => {
        const cartId = 1;
        const res = await request(app).get(`/cartdetails/cart/${cartId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('cartdetails');
        expect(res.body.cartdetails).toHaveLength(1);
    });

    it('You must be able to update a CartDetail by id', async () => {
        const cartDetailId = 1;
        const res = await request(app).put(`/cartdetails/${cartDetailId}`).send({
            "quantity": 2,
            "amount" : 80,    
            "bookId":  1,
            "cartId":  1 
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('quantity');
        expect(res.body.quantity).toBe(2);
    });


    //Deletes 
    it('You must delete the CartDetail', async () => {
        const cartDetailId = 1;
        const res = await request(app).delete(`/cartdetails/${cartDetailId}`);
        expect(res.statusCode).toEqual(204);
    });

    it('You must delete the Cart', async () => {
        const cartId = 1;
        const res = await request(app).delete(`/carts/${cartId}`);
        expect(res.statusCode).toEqual(204);
    });

    it('You must delete the book', async () => {
        const bookId = 1;
        const res = await request(app).delete(`/books/${bookId}`);
        expect(res.statusCode).toEqual(204);
    });

    it('You must delete the Client', async () => {
        const clientId = 1;
        const res = await request(app).delete(`/clients/${clientId}`);
        expect(res.statusCode).toEqual(204);
    });

    it('You must delete the author', async () => {
        const authorId = 1;
        const res = await request(app).delete(`/authors/${authorId}`);
        expect(res.statusCode).toEqual(204);
    });

});