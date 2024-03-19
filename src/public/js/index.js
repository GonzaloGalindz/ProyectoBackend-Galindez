const socketClient = io();

const formProd = document.getElementById("formProduct");
const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");
const stock = document.getElementById("stock");
const code = document.getElementById("code");
const tableProds = document.getElementById("bodyProd");
const formDelete = document.getElementById("deleteProduct");
const id = document.getElementById("id");

formProd.onsubmit = (e) => {
  e.preventDefault();
  const objProd = {
    title: title.value,
    description: description.value,
    price: Number(price.value),
    stock: Number(stock.value),
    code: code.value,
  };
  socketClient.emit("agregar", objProd);
  title.value = "";
  description.value = "";
  price.value = "";
  stock.value = "";
  code.value = "";
};

formDelete.onsubmit = (e) => {
  e.preventDefault();
  socketClient.emit("eliminar", Number(id.value));
  id.value = "";
};

socketClient.on("added", (newProduct) => {
  if (typeof newProduct === "object") {
    const addRow = `
        <tr>
            <td style="padding: 0.7rem;border: 1px solid black;">${newProduct.id}</td>
            <td style="padding: 0.7rem;border: 1px solid black;">${newProduct.title}</td>
            <td style="padding: 0.7rem;border: 1px solid black;">${newProduct.description}</td>
            <td style="padding: 0.7rem;border: 1px solid black;">${newProduct.price}</td>
            <td style="padding: 0.7rem;border: 1px solid black;">${newProduct.stock}</td>
            <td style="padding: 0.7rem;border: 1px solid black;">${newProduct.code}</td>
        </tr>`;
    tableProds.innerHTML += addRow;
  }
});

socketClient.on("deleted", (arrProducts) => {
  if (typeof arrProducts === "object") {
    const addRow = arrProducts
      .map((objProd) => {
        return `
              <tr>
                  <td style="padding: 0.7rem;border: 1px solid black;">${objProd.id}</td>
                  <td style="padding: 0.7rem;border: 1px solid black;">${objProd.title}</td>
                  <td style="padding: 0.7rem;border: 1px solid black;">${objProd.description}</td>
                  <td style="padding: 0.7rem;border: 1px solid black;">${objProd.price}</td>
                  <td style="padding: 0.7rem;border: 1px solid black;">${objProd.stock}</td>
                  <td style="padding: 0.7rem;border: 1px solid black;">${objProd.code}</td>
              </tr>`;
      })
      .join(" ");
    tableProds.innerHTML = addRow;
  }
});
