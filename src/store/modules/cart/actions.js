export const addToCartRequest = (id, navigation) => {
  return {
    type: '@cart/ADD_REQUEST',
    id,
    navigation
  };
};

export const addToCartSuccess = product => {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  };
};

export const updateAmountRequest = (id, amount) => {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id,
    amount,
  };
};
export const updateAmountSuccess = (id, amount) => {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    id,
    amount,
  };
};

export const deleteSuccess = id => {
  return {
    type: '@cart/DELETE_SUCCESS',
    id,
  };
};
