"use client"; // this is a client component 👈🏽
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "styles/globals.css";
import "./custom.css";


export default function ProductsPage() {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPriceBuy, setProductPriceBuy] = useState("");
  const [productPriceSell, setProductPriceSell] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productImage, setProductImage] = useState("");
  const [products, setProducts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filter, setFilter]=useState("");
  const [editingProductUuid, setEditingProductUuid] = useState(null);

  

///----
useEffect(() => {
  const fetchProducts = async () => {
    const response = await fetch("http://localhost:3002/products");
    const data = await response.json();

    setProducts(data);
  };
  fetchProducts();
}, []);

const filteredProducts = products.filter((product) =>
  product.code.includes(filter)
);

const handleAddProduct = (e) => {
  e.preventDefault();

  // Asegurarse de que todos los campos no estén vacíos
  if (!productName || !productCode || !productDescription || !productImage || !productBrand || !productPriceBuy || !productPriceSell || !productStock) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const newProduct = {
    name: productName,
    code: productCode,
    description: productDescription,
    image: productImage,
    brand_car: productBrand,
    price_buy: productPriceBuy,
    price_sell: productPriceSell,
    stock: productStock
  };

  const requestOptions = {
    method: editingProductUuid ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  };

  const url = editingProductUuid
    ? `http://localhost:3002/products/${editingProductUuid}`
    : "http://localhost:3002/products";

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);

      if (editingProductUuid) {
        setProducts(
          products.map((product) =>
            product.uuid === editingProductUuid ? data : product
          )
        );
      } else {
        setProducts([...products, data]);
      }

      setEditingProductUuid(null);
    })
    .catch((error) => {
      console.error;
    });

  setIsFormVisible(false);
};


  const handleDeleteProduct = (uuid) => {
    fetch(`http://localhost:3002/delete/${uuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setProducts(products.filter((product) => product.uuid !== uuid));
      })

      .catch((error) => {
        console.error;
      });
  };

  return (
    <div className="container mx-auto px-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        onClick={() => setIsFormVisible(true)}
      >
        Agregar Producto
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >

<input
  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 w-64"
  type="text"
  placeholder="Buscar por código"
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setFilter(e.target.value);
    }
  }}
/>
</form>

      <div className="bg-white min-h-screen px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8"
            >
              <div className="px-4 py-2 flex flex-col">
            <h2 className="text-gray-900 font-bold text-lg mb-2">
              {product.name}
            </h2>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <p className="text-gray-600 text-sm mb-2">Codigo: {product.code}</p>
            <p className="text-gray-600 text-sm mb-2">
              Marca de Auto: {product.brand_car}
            </p>
            <p className="text-gray-600 text-sm mb-2">Precio de Compra: {product.price_buy}</p>
            <p className="text-gray-600 text-sm mb-2">Precio de Venta: {product.price_sell}</p>
            <p className="text-gray-600 text-sm mb-4">Stock: {product.stock}</p>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-bold">S/ {product.price}</span>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-auto px-4 rounded-full">
                Agregar al carrito
              </button>
              <div className="mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => {
                    setIsFormVisible(true);
                    setProductName(product.name);
                    setProductDescription(product.description);
                    setProductCode(product.code);
                    setProductBrand(product.brand_car);
                    setProductPriceBuy(product.price_buy);
                    setProductPriceSell(product.price_sell);
                    setProductStock(product.stock);
                    setProductImage(product.image);
                  }}
                >
                  Editar
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleDeleteProduct(product.uuid)}
                >
                  Eliminar
                </button>
              
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isFormVisible && (
          <div className="fixed inset-y-0 right-0 w-1/4 bg-white p-4 z-10 mt-8">
            {/* add/edit product form */}

            <form className="form-container">
              <h2 className="text-gray-900 font-bold text-lg mb-2">
                Agregar Producto
              </h2>
              {/* EXIT */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline closeButton"
                onClick={() => setIsFormVisible(false)}
              >
                Cancelar
              </button>

              {/* NAME */}
<div className="mb-4">
  <label
    className="block text-gray-700 font-bold mb-2"
    htmlFor="name"
  >
    Nombre
  </label>
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="name"
    type="text"
    placeholder="Nombre del producto"
    value={productName}
    onChange={(e) => setProductName(e.target.value)}
  />
</div>

{/* CODE */}
<div className="mb-4">
  <label
    className="block text-gray-700 font-bold mb-2"
    htmlFor="code"
  >
    C贸digo
  </label>
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="code"
    type="text"
    placeholder="C贸digo del producto"
    value={productCode}
    onChange={(e) => setProductCode(e.target.value)}
  />
</div>

{/* BRAND_CAR */}
<div className="mb-4">
  <label
    className="block text-gray-700 font-bold mb-2"
    htmlFor="brand_car"
  >
    Marca del auto
  </label>
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="brand_car"
    type="text"
    placeholder="Marca del auto"
    value={productBrand}
    onChange={(e) => setProductBrand(e.target.value)}
  />
</div>

{/* DESCRIPTION */}
<div className="mb-4">
  <label
    className="block text-gray-700 font-bold mb-2"
    htmlFor="description"
  >
    Descripci贸n
  </label>
  <textarea
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="description"
    placeholder="Descripci贸n del producto"
    value={productDescription}
    onChange={(e) => setProductDescription(e.target.value)}
  />
</div>

{/* PRICE_BUY */}
<div className="mb-4">
  <label
    className="block text-gray-700 font-bold mb-2"
    htmlFor="price_buy"
  >
    Precio de compra
  </label>
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="price_buy"
    type="number"
    placeholder="Precio de compra"
    value={productPriceBuy}
    onChange={(e) => setProductPriceBuy(Number(e.target.value))}
  />
</div>

{/* PRICE_SELL */}
<div className="mb-4">
  <label
    className="block text-gray-700 font-bold mb-2"
    htmlFor="price_sell"
  >
    Precio de venta
  </label>
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="price_sell"
    type="number"
    placeholder="Precio de venta"
    value={productPriceSell}
    onChange={(e) => setProductPriceSell(Number(e.target.value))}
  />
</div>

{/* STOCK */}
<div className="mb-4">
  <label
    className="block text-gray-700 font-bold mb-2"
    htmlFor="stock"
  >
    Stock
  </label>
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="stock"
    type="number"
    placeholder="Stock"
    value={productStock}
    onChange={(e) => setProductStock(Number(e.target.value))}
  />
</div>

{/* IMAGE */}
<div className="mb-4">
  <label
    className="block text-gray-700 font-bold mb-2"
    htmlFor="image"
  >
    Imagen
  </label>
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="image"
    type="text"
    placeholder="URL de la imagen del producto"
    value={productImage}
    onChange={(e) => setProductImage(e.target.value)}
  />
</div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={handleAddProduct}
                >
                  Agregar
                </button>
              </div>
            </form>   
          </div>
        )}
      </div>
    </div>
  );
}
