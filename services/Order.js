import { getProductById } from "./Menu.js";

export async function addToCart(productId) {
  const product = await getProductById(productId);
  const result = app.store.cart.filter(
    (prodIncard) => prodIncard.id === productId
  );
  if (result.length == 1) {
    //the product is already in the cart, increment the quantity
    app.store.cart = app.store.cart.map((p) =>
      p.product.id === productId
        ? {
            ...prodIncard, // keep the existing properties
            quantity: prodIncard.quantity + 1, // increment quantity
          }
        : prodIncard // return unchanged for other products
    );
  } else {
    app.store.cart = [
      ...app.store.cart, // copy the existing cart
      {
        product,
        quantity: 1, // add new product with quantity 1
      },
    ];
  }
}

export function removeFromCart(id) {
    // Remove a product from the cart by id
    app.store.cart = app.store.cart.filter(
        (prodIncart) => prodIncart.product.id !== id
    );  
}