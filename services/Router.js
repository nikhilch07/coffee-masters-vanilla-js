const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("link clicked");
        
        window.addEventListener("popstate", (event) => {
            Router.go(event.state.route, false); // Handle browser back/forward buttons
        }); // Listen for popstate events to handle browser navigation

        const url = event.target.getAttribute("href"); // Get the href attribute of the clicked link
        Router.go(url); // Call the go method to navigate to the route
      });
    });
  }, 
  go: (route, addToHistory = true) => {
    console.log(`Navigating to ${route}`);
    console.log('inside router')
    // Change the URL in the browser
    if (addToHistory) {
      history.pushState({ route }, "", route); // Use the History API to change the URL without reloading the page
    }
    let pageElement = null;
    switch (route) {
        case "/":
            pageElement = document.createElement("menu-page");
            pageElement.textContent = "Menu Page";
            break;
        case "/order":
            pageElement = document.createElement("order-page");
            pageElement.textContent = "oder Page";
            break;
            default:
                if(route.startsWith("/product-")){
                    pageElement = document.createElement("details-page");
                    const paramId = route.substring(route.lastIndexOf("-") + 1); // Extract the product ID from the route
                    pageElement.dataset.productId = paramId; // Set the data-id attribute for the page element
                    break;
                }
  }
  if(pageElement){
        // Clear the existing content of the main element
        const mainElement = document.querySelector("main");
        mainElement.innerHTML = ""; // Clear existing content
        // Append the new page content to the main element
        mainElement.appendChild(pageElement);
        window.scrollX  = 0; // Ensure the scroll position is reset to the top of the page
        window.scrollY = 0; // Scroll to the top of the page after navigation
        }
  }
};

export default Router;
