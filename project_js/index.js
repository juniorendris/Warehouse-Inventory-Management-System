const btn = document.getElementById("darkModeBtn");
btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  // Update button visual text
  if (document.body.classList.contains("dark")) {
    btn.textContent = "☀️ Light Mode";
  } else {
    btn.textContent = "🌙 Dark Mode";
  }
});

const addinput = document.querySelector("#insert-product");
addinput.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    sku: document.querySelector("#sku_insert").value,
    product_name: document.querySelector("#product_name_insert").value,
    category: document.querySelector("#category_insert").value,
    price: document.querySelector("#Price_insert").value,
    stock_quantity: document.querySelector("#stock_quantity_insert").value,
    expiration_date: document.querySelector("#expiration_date_insert").value,
  };
  try {
    console.log("data is sending to db wait a second");
    const response = await fetch("/insert-product", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!result.success) {
      console.log(result.message);
      alert(result.message);
      return;
    }
    console.log(result.message);
    alert(result.message);
    addinput.reset();
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
});
const ViewStore = document.getElementById("products_view");
ViewStore.addEventListener("submit", async (e) => {
  const output = document.querySelector(".card");
  e.preventDefault();
  try {
    console.log("pleace wait server is preparing products view.... ");
    const response = await fetch("/products", { method: "GET" });
    const result = await response.json();
    if (!result.success) {
      console.log(result.message);
      alert(result.message);
      return;
    }
    output.innerHTML = `
  <table class="product-table">
    <thead>
      <tr>
        <th>SKU</th>
        <th>Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Expiration</th>
      </tr>
    </thead>

    <tbody>
      ${result.data
        .map(
          (product) => `
        <tr>
          <td>${product.sku}</td>
          <td>${product.product_name}</td>
          <td>${product.category}</td>
          <td>${product.price}</td>
          <td>${product.stock_quantity}</td>
          <td>${product.expiration_date}</td>
        </tr>
      `,
        )
        .join("")}
    </tbody>
  </table>
`;

    console.log("the product sent to output congra");
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
});

const changeQuantity = document.getElementById("update");
changeQuantity.addEventListener("submit", async (e) => {
  e.preventDefault();

  const skuinput = document.querySelector("#sku_search");
  const sku = skuinput.value;

  const new_quantity = Number(document.querySelector("#new_quantity").value);

  try {
    const response = await fetch(`/update-product/${sku}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: new_quantity,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert(result.message);

    // Reset the entire form
    changeQuantity.reset();
  } catch (error) {
    console.error(error);
    alert("Error occurred. Please try again later.");
  }
});
const deleteProduct = document.getElementById("delete-product");
deleteProduct.addEventListener("submit", async (e) => {
  e.preventDefault();

  const delskuInput = document.querySelector("#delSku");
  const delsku = delskuInput.value;

  try {
    const response = await fetch(`/delete-product/${delsku}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!result.success) {
      return alert(result.message);
    }

    alert(result.message);
    deleteProduct.reset();
  } catch (error) {
    console.error(error);
    alert("Error occurred, please try again later");
  }
});

const searchItem = document.getElementById("search-product");
searchItem.addEventListener("submit", async (e) => {
  e.preventDefault();
  const output = document.querySelector(".card");
  const category = document.querySelector("#Category_search").value;
  try {
    const response = await fetch(`/search-product/${category}`, {
      method: "GET",
    });
    const result = await response.json();
    if (!result.success) {
      return alert(result.message);
    }
    output.innerHTML = `
  <table class="product-table">
    <thead>
      <tr>
        <th>SKU</th>
        <th>Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Expiration</th>
      </tr>
    </thead>

    <tbody>
      ${result.data
        .map(
          (product) => `
        <tr>
          <td>${product.sku}</td>
          <td>${product.product_name}</td>
          <td>${product.category}</td>
          <td>${product.price}</td>
          <td>${product.stock_quantity}</td>
          <td>${product.expiration_date}</td>
        </tr>
      `,
        )
        .join("")}
    </tbody>
  </table>
`;

    searchItem.reset();
  } catch (error) {
    console.error(error.message);
    alert("Error occurred, try again later");
  }
});

const ViewLowSock = document.getElementById("lowStockForm");
ViewLowSock.addEventListener("submit", async (e) => {
  const output = document.querySelector(".alert");
  e.preventDefault();
  try {
    console.log("pleace wait server is preparing products view.... ");
    const response = await fetch("/low-stock", { method: "GET" });
    const result = await response.json();
    if (!result.low) {
      console.log(result.message);
      output.innerHTML = `<b > ${result.message}</b>`;
      return;
    }
    output.innerHTML = `
  <table class="product-table">
    <thead>
      <tr>
        <th>SKU</th>
        <th>Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Expiration</th>
      </tr>
    </thead>

    <tbody>
      ${result.data
        .map(
          (product) => `
        <tr>
          <td>${product.sku}</td>
          <td>${product.product_name}</td>
          <td>${product.category}</td>
          <td>${product.price}</td>
          <td>${product.stock_quantity}</td>
          <td>${product.expiration_date}</td>
        </tr>
      `,
        )
        .join("")}
    </tbody>
  </table>
`;

    console.log("the product sent to output congra");
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
});

const ViewToExp = document.getElementById("expiryForm");
ViewToExp.addEventListener("submit", async (e) => {
  const output = document.querySelector(".alert_ex");
  e.preventDefault();
  try {
    console.log("pleace wait server is preparing products view.... ");
    const response = await fetch("/expiring-soon", { method: "GET" });
    const result = await response.json();
    if (!result.low) {
      console.log(result.message);
      output.innerHTML = `<b > ${result.message}</b>`;
      return;
    }
    output.innerHTML = `
  <table class="product-table">
    <thead>
      <tr>
        <th>SKU</th>
        <th>Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Expiration</th>
      </tr>
    </thead>
    <tbody>
      ${result.data
        .map(
          (product) => `
        <tr>
          <td>${product.sku}</td>
          <td>${product.product_name}</td>
          <td>${product.category}</td>
          <td>${product.price}</td>
          <td>${product.stock_quantity}</td>
          <td>${product.expiration_date}</td>
        </tr>
      `,
        )
        .join("")}
    </tbody>
  </table>
`;

    console.log("the product sent to output congra");
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
});
