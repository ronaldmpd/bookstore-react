const CartRepository = require('../repositories/CartRepository');

const getCarts = async (from, limit, filters, attributes) => {
  let defaultFilters = {
    //state: true,
  };
    if (!filters) {
      filters = defaultFilters;
    } else {
      filters = { ...defaultFilters, ...filters };
    }
    const { count, rows } = await CartRepository.getCarts(from, limit, filters, attributes);
    return { count, carts: rows };
  };
  
  const getCartById = async (id) => {
    return await CartRepository.getCartById(id);
  };

  const getCartByClientId = async (clientId) => {
    const { count, rows } = await CartRepository.getCartByClientId(clientId);
    return { count, carts: rows };
  };

const addCart = async (cart) => {
    return await CartRepository.addCart(cart);
};

const updateCart = async ({
    cartId,
    total,
    bookId,
    clientId,    
  }) => {
    const cart = await CartRepository.updateCart({
      cartId,
      total,
      bookId,
      clientId,      
    });
    return cart;
  };

  const deleteCart = async (id) => {
    const cart = await CartRepository.deleteCart(id);
    return cart;
  };

module.exports = {
    getCarts,
    getCartById,
    getCartByClientId,
    addCart,
    updateCart,
    deleteCart,
};
