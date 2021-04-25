const CartDetail = require('../models').CartDetail;

// const getCartDetails = async (from, limit, filters, attributes) => {
//     const data = await CartDetail.findAndCountAll({
//       limit,
//       offset: from,
//       where: filters,
//       attributes,
//     });
//     return data;
//   };
  
  const getCartDetailById = async (id) => {
    return await CartDetail.findOne({ where: { id } });
  };

  const getCartDetailByCartId = async (cartId) => {
    return await CartDetail.findAndCountAll({ where: { cartId } });
  };

const addCartDetail = async ({quantity, amount,  bookId, cartId}) =>{    
    const cartDetail = await CartDetail.create({quantity, amount, bookId, cartId });
    return cartDetail;
}

const updateCartDetail = async ({
  cartDetailId,
  quantity,
  amount,
  bookId,
  cartId,    
  }) => {    
    const currentCartDetail = await CartDetail.findOne({ where: { id: cartDetailId }});
    currentCartDetail.quantity = quantity || currentCartDetail.quantity;
    currentCartDetail.amount = amount || currentCartDetail.amount;
    currentCartDetail.bookId = bookId || currentCartDetail.bookId;
    currentCartDetail.cartId = cartId || currentCartDetail.cartId;
     
    const cartDetail = await currentCartDetail.save();
    return cartDetail;
  };

  const deleteCartDetail = async (id) => {    
    const cartDetail = await CartDetail.destroy({ where: { id } });
    return cartDetail;
  };

module.exports = {    
    getCartDetailById,
    getCartDetailByCartId,
    addCartDetail,
    updateCartDetail,
    deleteCartDetail
};