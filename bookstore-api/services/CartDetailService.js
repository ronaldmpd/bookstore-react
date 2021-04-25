const CartDetailRepository = require('../repositories/CartDetailRepository');
 
  const getCartDetailById = async (id) => {
    return await CartDetailRepository.getCartDetailById(id);
  };

  const getCartDetailByCartId = async (clientId) => {
    const { count, rows } = await CartDetailRepository.getCartDetailByCartId(clientId);
    return { count, cartdetails: rows };
  };

const addCartDetail = async (cartDetail) => {
    return await CartDetailRepository.addCartDetail(cartDetail);
};

const updateCartDetail = async ({
    cartDetailId,
    quantity,
    amount,
    bookId,
    cartId,    
  }) => {
    const cartDetail = await CartDetailRepository.updateCartDetail({
      cartDetailId,
      quantity,
      amount,
      bookId,
      cartId,      
    });
    return cartDetail;
  };

  const deleteCartDetail = async (id) => {
    const cartDetail = await CartDetailRepository.deleteCartDetail(id);
    return cartDetail;
  };

module.exports = {    
    getCartDetailById,
    getCartDetailByCartId,
    addCartDetail,
    updateCartDetail,
    deleteCartDetail,
};
