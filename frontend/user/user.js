const cardContainer = document.getElementById("card-container");

async function main() {
  const response = await fetch("/api/all");
  const data = await response.json();

  const htmlData = data
    .map(
      (d, index) =>
        `<div class="card">
          <img src="${d.photo}" class="imgCont">
          <h3>${d.title}</h3>
          <h4>${d.price} €</h4>
          <div class="btn-container">
          <button class="details" data-index="${index}">Details</button>
          <button class="cart">Add to cart</button>
          </div>
        </div>`
    )
    .join("");

  cardContainer.insertAdjacentHTML("beforeend", htmlData);

  const detailsButtons = document.querySelectorAll(".details");
  detailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const dataIndex = button.getAttribute("data-index");
      const selectedData = data[dataIndex];
      showModal(selectedData);
    });
  });
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