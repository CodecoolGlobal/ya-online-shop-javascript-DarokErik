// const cardContainer = document.getElementById("card-container");
// const totalAmountDisplay = document.createElement("div");
// const cartItems = [];

// async function main() {
//   const response = await fetch("/api/all");
//   const data = await response.json();

//   const htmlData = data
//     .map(
//       (d, index) =>
//         `<div class="card">
//           <img src="${d.photo}" width="200" height="200">
//           <h3>${d.title}</h3>
//           <h4>${d.price} €</h4>
//           <div class="btn-container">
//           <button class="details" data-index="${index}">Details</button>
//           <button class="cart" data-item='${JSON.stringify(
//             d
//           )}'>Add to cart</button>
//               </div>
//         </div>`
//     )
//     .join("");

//   cardContainer.insertAdjacentHTML("beforeend", htmlData);

//   const detailsButtons = document.querySelectorAll(".details");
//   detailsButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       const dataIndex = button.getAttribute("data-index");
//       const selectedData = data[dataIndex];
//       showModal(selectedData);
//     });
//   });

//   const cartButtons = document.querySelectorAll(".cart");
//   cartButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       const itemData = JSON.parse(button.getAttribute("data-item"));
//       addToCart(itemData);
//       updateCartMenu();
//     });
//   });

//   async function addToCart(item) {
//     cartItems.push(item);
//     console.log("Cart Items:", cartItems);
//     showPopup()
    
//   }

//   function updateCartMenu() {
//     cartMenu.innerHTML = cartItems
//       .map((item) => `<div>${item.title} - ${item.price} €</div>`)
//       .join("");
//   }

//   const cartMenu = document.getElementById("cart-menu");

//   document.getElementById("cart-button").addEventListener("click", () => {
//     toggleCartMenu();
//   });

//   function toggleCartMenu() {
//     if (cartMenu.style.display === "none") {
//       showCartMenu();
//     } else {
//       hideCartMenu();
//     }
//   }

//   function showCartMenu() {
//     const root = document.getElementById("root");
//     root.innerHTML = cartItems
//       .map(
//         (item) => `
//         <div>${item.title} - ${item.price} €</div>
//     `
//       )
//       .join("");

//     const totalAmount = calculateTotalAmount();
//     totalAmountDisplay.textContent = `Total price: ${totalAmount} €`;

//     root.appendChild(totalAmountDisplay);

//     cartMenu.style.display = "block";

//     const url = new URL(window.location.href);
//     url.pathname = "/cart";
//     window.history.pushState({ path: url.href }, "", url.href);
//   }

//   document.getElementById("cart-button").addEventListener("click", () => {
//     toggleCartMenu();
//     showCartMenu();
//   });

//   function hideCartMenu() {
//     cartMenu.innerHTML = "";
//     cartMenu.style.display = "none";
//   }

//   function calculateTotalAmount(cartItems) {
//     return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
//   }

//   function calculateTotalAmount() {
//     return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
//   }
  
//   function showPopup() {
//     popup.style.display = 'block';
//     setTimeout(function() {
//       popup.style.display = 'none';
//     }, 2000); 
//   }
  
// }

// main();

// async function showModal(data) {
//   const existingModal = document.querySelector(".modal");
//   if (existingModal) {
//     existingModal.remove();
//   }
//   const modal = document.createElement("div");
//   modal.className = "modal";

//   const content = `
//     <div class="modalContainer">
//     <h2>${data.title}</h2>
//     <p><strong>Height:</strong> ${data.size.height}</p>
//     <p><strong>Width:</strong> ${data.size.width}</p>
//     <p><strong>Depth:</strong> ${data.size.depth}</p>
//     <p><strong>Price:</strong> ${data.price}</p>
//     <p><strong>Left in stock </strong> ${data.stock}</p>
//     <p><strong>Material:</strong> ${data.material}</p>
//     <p><strong>Color:</strong> ${data.color}</p>
//     <p><strong>Description:</strong> ${data.description}</p>
//     <button id="closeModalBtn">Close</button>
//     </div>
//   `;
//   modal.innerHTML = content;

//   modal.querySelector("#closeModalBtn").addEventListener("click", () => {
//     modal.remove();
//   });

//   modal.addEventListener("click", (event) => {
//     if (event.target === modal) {
//       modal.remove();
//     }
//   });

//   document.body.appendChild(modal);
// }


const cardContainer = document.getElementById("card-container");
const cartMenu = document.querySelector(".cartMenu");
const totalAmountDisplay = document.createElement("div");
const cartItems = [];
let currentPage = 'home'; 

async function main() {
  const response = await fetch("/api/all");
  let data = await response.json();

  document.getElementById("cart-button").addEventListener("click", () => {
    navigateToCart();
  });

  document.getElementById("home-button").addEventListener("click", () => {
    navigateToHome();
  });

  function navigateToCart() {
    currentPage = 'cart';
    const url = new URL(window.location);
    url.pathname = "/cart";
    window.history.pushState({ path: url.href }, "", url.href);
    showCartMenu();
  }

  function navigateToHome() {
    currentPage = 'home';
    const url = new URL(window.location);
    url.pathname = "/user";
    window.history.pushState({ path: url.href }, "", url.href);
    renderHome();
  }

  function renderHome() {
    renderCards();
    cartMenu.style.display = "none";
  }

  function renderCards() {
    const htmlData = data
      .map(
        (d, index) =>
          `<div class="card">
            <img src="${d.photo}" width="200" height="200">
            <h3>${d.title}</h3>
            <h4>${d.price} €</h4>
            <div class="btn-container">
            <button class="details" data-index="${index}">Details</button>
            <button class="cart" data-item='${JSON.stringify(d)}'>Add to cart</button>
            </div>
          </div>`
      )
      .join("");

    cardContainer.innerHTML = htmlData;
    addEventListeners();
  }

  function showCartMenu() {
    if(currentPage === 'cart') {
      cardContainer.innerHTML = ''; 
      updateCartMenu();
    }
  }

  function updateCartMenu() {
    let cartHtml = cartItems
      .map((item, index) => `<div id="cart-content">${item.title} - ${item.price} € <button class="remove-item" data-index="${index}">X</button></div>`)
      .join("");
    const totalAmount = calculateTotalAmount();
    cartHtml += `<div id="totalprice">Total price: ${totalAmount} €</div>`;
    cartHtml += '<button id="buy-button">Buy</button>';
    cartMenu.innerHTML = cartHtml;
    cartMenu.style.display = "flex";

    document.getElementById("buy-button").addEventListener("click", buyItems);

    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", (event) => {
        removeItemFromCart(event.target.getAttribute("data-index"));
      });
    });
  }

  function buyItems() {
    cartItems.forEach(item => {
      const dataIndex = data.findIndex(d => d.id === item.id);
      if (dataIndex !== -1 && data[dataIndex].stock > 0) {
        data[dataIndex].stock -= 1;
      }
    });
    cartItems.length = 0; 
    alert("Thank you for your purchase!");
    navigateToHome(); 
  }

  function removeItemFromCart(index) {
    cartItems.splice(index, 1);
    updateCartMenu();
  }

  function calculateTotalAmount() {
    return cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
  }

  function addEventListeners() {
    const detailsButtons = document.querySelectorAll(".details");
    const cartButtons = document.querySelectorAll(".cart");

    detailsButtons.forEach(button => {
      button.addEventListener("click", event => {
        const dataIndex = button.getAttribute("data-index");
        const selectedData = data[dataIndex];
        showModal(selectedData);
      });
    });

    cartButtons.forEach(button => {
      button.addEventListener("click", event => {
        const itemData = JSON.parse(button.getAttribute("data-item"));
        addToCart(itemData);
      });
    });
  }

  async function addToCart(item) {
    cartItems.push(item);
    console.log("Cart Items:", cartItems);
    showPopup()
  }

  
  const url = new URL(window.location);
  if (url.pathname === "/cart") {
    navigateToCart();
  } else {
    renderHome();
  }

  function showPopup() {
        popup.style.display = 'block';
        setTimeout(function() {
          popup.style.display = 'none';
        }, 2000); 
      }
}

main();


async function showModal(data) {
  const existingModal = document.querySelector(".modal");
  if (existingModal) {
    existingModal.remove();
  }
  const modal = document.createElement("div");
  modal.className = "modal";

  const content = `
    <div class="modalContainer">
    <h2>${data.title}</h2>
    <p><strong>Height:</strong> ${data.size.height}</p>
    <p><strong>Width:</strong> ${data.size.width}</p>
    <p><strong>Depth:</strong> ${data.size.depth}</p>
    <p><strong>Price:</strong> ${data.price}</p>
    <p><strong>Left in stock </strong> ${data.stock}</p>
    <p><strong>Material:</strong> ${data.material}</p>
    <p><strong>Color:</strong> ${data.color}</p>
    <p><strong>Description:</strong> ${data.description}</p>
    <button id="closeModalBtn">Close</button>
    </div>
  `;
  modal.innerHTML = content;

  modal.querySelector("#closeModalBtn").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });

  document.body.appendChild(modal);
}
