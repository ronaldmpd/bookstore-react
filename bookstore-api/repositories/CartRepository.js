const Cart = require('../models').Cart;

const getCarts = async (from, limit, filters, attributes) => {
    const data = await Cart.findAndCountAll({
      limit,
      offset: from,
      where: filters,
      attributes,
    });
    return data;
  };
  
  const getCartById = async (id) => {
    return await Cart.findOne({ where: { id } });
  };

  const getCartByClientId = async (clientId) => {
    return await Cart.findAndCountAll({ where: { clientId, state: true, } });
  };

const addCart = async ({total, status, clientId }) =>{    
    const cart = await Cart.create({total, status, clientId });
    return cart;
}

const updateCart = async ({
    cartId,
    total,
    status,
    clientId,    
  }) => {   
    const currentCart = await Cart.findOne({ where: { id: cartId }});
    currentCart.total = total || currentCart.total;
    currentCart.status = status || currentCart.status;
    currentCart.clientId = clientId || currentCart.clientId;
     
    const cart = await currentCart.save();
    return cart;
  };

  const deleteCart = async (id) => {        
    const deleteState = {
      state: false,
    };
    const cart = await Cart.update(deleteState, { where: { id } });
    return cart;
  };

module.exports = {
    getCarts,
    getCartById,
    getCartByClientId,
    addCart,
    updateCart,
    deleteCart
};