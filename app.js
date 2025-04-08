import API from './services/api.js';
import Store from './services/store.js';
import { loadData } from './services/Menu.js';
import Router from './services/Router.js';

//Link web components to the global scope
import { MenuPage } from './components/MenuPage.js';
import ProductItem from './components/ProductItem.js';
import Detailsage from './components/DetailsPage.js';
import OrderPage from './components/OrderPage.js';
import CartItem from './components/CartItem.js';

window.app = {};
app.store = Store;
app.router = Router;

// Initialize the application
window.addEventListener('DOMContentLoaded', async () => {
    loadData(); // Load the menu data into the store
    app.router.init(); // Initialize the router
    const pathName = window.location.pathname; // Get the current path
    Router.go(pathName);
});

window.addEventListener('appcartchange', (event) => {
    const badge = document.getElementById("badge");
    const quantity = app.store.cart.reduce((accumulator, item) => accumulator + item.quantity, 0)
    badge.textContent = quantity;
    badge.hidden = (quantity === 0); // Hide the badge if there are no items in the cart     
});
