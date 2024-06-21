export const setCart = (cartArr) => {
  localStorage.setItem("Cart", JSON.stringify(cartArr));
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem("Cart"));
};
