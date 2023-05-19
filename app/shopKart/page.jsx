import Head from "next/head"
import styles from "../shopKart/shopKart.module.css"


// Ejemplos de productos que agregué
const products = [
    {
      id: 111111111111,
      name: "Pastilla Hyundai H465",
      price: 1000,
      quantity: 100,
    },
    
    {
      id: 2,
      name: "Pastilla Volkswagen-------_________________-----G485",
      price: 50,
      quantity: 3,
    },
    {
      id: 3,
      name: "Pastillas Toyota------------H661",
      price: 70,
      quantity: 6,
    },
    {
      id: 4,
      name: "Pastilla Volkswagen------------G485",
      price: 50,
      quantity: 3,
    },
    {
        id: 11321,
        name: "Pastilla Hyundai H465",
        price: 100,
        quantity: 10,
      },
  ];

// Code para calcular el precio total de los productos en el carrito
const getTotalPrice = () => 
{
    let totalPrice = 0;
    for (const product of products) 
    {
        totalPrice += product.price * product.quantity;
    }
    return totalPrice;
};

// Code para el posible botón de pago
function handlePayment() {
    // Code para enviar detalles del pago al servidor
    // Talvez Code para mostrar una alerta de confirmación al usuario
    alert("¡Gracias por su compra!");
} 

export default function ShopKartPage () {
    return(
        <>
            <div>
                <h1 className={styles.h1}>Carrito de compras</h1>
            </div>
            <div>                
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr className={styles.tr}>
                            <th className={styles.th}>ID</th>
                            <th className={styles.th}>Nombre del producto</th>
                            <th className={styles.th}>Cantidad</th>
                            <th className={styles.th}>Precio</th>
                            <th className={styles.th}>Total</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                                <td>{product.price * product.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>                
            </div>
            <div>
                <p className={styles.p}>Total a pagar: S/ {getTotalPrice()}</p>
                <button className={styles.button} /*onClick={handlePayment}*/>Pagar</button>
            </div>
        </>
    )
}
