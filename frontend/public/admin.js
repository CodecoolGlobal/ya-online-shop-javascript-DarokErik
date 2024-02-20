async function main() {
  const response = await fetch("/api/all");
  const data = await response.json();

  const htmlData = data
    .map(
      (data) =>
        `<div>
        <form class="update-data" id=${data.id}>
        <input type="number" placeholder="id" value="${data.id}" id="update-input-id-${data.id}"> 
        <input type="text" placeholder="Title" value="${data.title}" id="update-input-title-${data.id}">
        <input type="number" placeholder="Height" value="${data.size.height}" id="update-input-height-${data.id}">
        <input type="number" placeholder="Width" value="${data.size.width}" id="update-input-width-${data.id}">
        <input type="number" placeholder="Depth" value="${data.size.depth}" id="update-input-depth-${data.id}">
        <input type="number" placeholder="Price" value="${data.price}" id="update-input-price-${data.id}">
        <input type="number" placeholder="Stock" value="${data.stock}" id="update-input-stock-${data.id}">
        <input type="text" placeholder="Material" value="${data.material}" id="update-input-material-${data.id}">
        <input type="text" placeholder="Color" value="${data.color}" id="update-input-color-${data.id}">
        <input type="text" placeholder="Description" value="${data.description}" id="update-input-description-${data.id}">
        <input type="text" placeholder="Photo" value="${data.photo}" id="update-input-photo-${data.id}">
        <button type="submit">Update Item</button>
        </form>
        <button id="delete-${data.id}">Delete Item</button>
        </div>`
    )
    .join("");

  const root = document.getElementById("root");
  root.insertAdjacentHTML("beforeend", htmlData);

  const form = document.getElementById("new-data");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const idInput = document.getElementById("input-id");
    const titleInput = document.getElementById("input-title");
    const heightInput = document.getElementById("input-height");
    const widthInput = document.getElementById("input-width");
    const depthInput = document.getElementById("input-depth");
    const priceInput = document.getElementById("input-price");
    const stockInput = document.getElementById("input-stock");
    const materialInput = document.getElementById("input-material");
    const colorInput = document.getElementById("input-color");
    const descriptionInput = document.getElementById("input-description");
    const photoInput = document.getElementById("input-photo");

    const id = idInput.value;
    const title = titleInput.value;
    const newData = {
      id: parseInt(id),
      title: title,
      size: {
        height: parseInt(heightInput.value),
        width: parseInt(widthInput.value),
        depth: parseInt(depthInput.value),
      },
      price: parseInt(priceInput.value),
      stock: parseInt(stockInput.value),
      material: materialInput.value,
      color: colorInput.value,
      description: descriptionInput.value,
      photo: photoInput.value,
    };
    await postData(newData);
  });

  const updateforms = document.querySelectorAll(".update-data");
  updateforms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const idInput = document.getElementById(`update-input-id-${form.id}`);
      const titleInput = document.getElementById(
        `update-input-title-${form.id}`
      );
      const heightInput = document.getElementById(
        `update-input-height-${form.id}`
      );
      const widthInput = document.getElementById(`update-input-width-${form.id}`);
      const depthInput = document.getElementById(
        `update-input-depth-${form.id}`
      );
      const priceInput = document.getElementById(
        `update-input-price-${form.id}`
      );
      const stockInput = document.getElementById(
        `update-input-stock-${form.id}`
      );
      const materialInput = document.getElementById(
        `update-input-material-${form.id}`
      );
      const colorInput = document.getElementById(
        `update-input-color-${form.id}`
      );
      const descriptionInput = document.getElementById(
        `update-input-description-${form.id}`
      );
      const photoInput = document.getElementById(
        `update-input-photo-${form.id}`
      );
      ;

      const id = idInput.value;
      const title = titleInput.value;
      const newData = {
        id: parseInt(id),
        title: title,
        size: {
          height: parseInt(heightInput.value),
          width: parseInt(widthInput.value),
          depth: parseInt(depthInput.value),
        },
        price: parseInt(priceInput.value),
        stock: parseInt(stockInput.value),
        material: materialInput.value,
        color: colorInput.value,
        description: descriptionInput.value,
        photo: photoInput.value,
      };

      await putData(newData, id);
    });
    const deleteButton = document.getElementById(`delete-${form.id}`);
    deleteButton.addEventListener("click", async () => {
      await deleteData(form.id);
    });
  });
}
main();

async function postData(data) {
  await fetch("/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

async function patchData(data, id) {
  await fetch(`/api/data/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

async function putData(data, id) {
  await fetch(`/api/data/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

async function deleteData(id) {
  await fetch(`/api/data/${id}`, {
    method: "DELETE",
  });
}

