import React from "react";
import axios from "axios";
import AppContext from "../../context";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import styles from "./Drawer.module.scss"; 


function Drawer({ onClose, onRemove, cartOpened}) {
  
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const {cartItems, setCartItems, totalPrice} = useCart();

  const onClickOrder = async () => {
    try{
      setIsLoading(true);
      const {data} = await axios.post("https://12ea0c69c119ca4c.mokky.dev/orders", {
        items: cartItems,
      });
      await axios.patch("https://12ea0c69c119ca4c.mokky.dev/cart", []);
      setOrderId(data.id)
      setIsOrderComplete(true);
      setCartItems([]);
    } catch(error){
      alert("Ошибка при создании заказа :(");
    }
    setIsLoading(false);
  }

  return (
    <div className={`${styles.overlay} ${cartOpened ? styles.overlayVisible : '' }` }>
      <div className={styles.drawer}>
        <h2>
          Корзина
          <img
            className={styles.cartButton}
            onClick={onClose}
            width={32}
            height={32}
            src="img/btn-remove.svg"
            alt="Close"
          />
        </h2>
        {cartItems.length > 0 ? (
          <div className={styles.cartFilled}>
            <div className={styles.item}>
              {cartItems.map((obj) => {
                return (
                  <div className={styles.cartItem}>
                    <img
                      width={70}
                      height={70}
                      src={obj.image}
                      alt="Sneakers"
                    />
                    <div className={styles.cartInfo}>
                      <p>{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img
                      className={styles.cartButton}
                      onClick={() => onRemove(obj.id)}
                      width={32}
                      height={32}
                      src="img/btn-remove.svg"
                      alt="Plus"
                    />
                  </div>
                );
              })}
            </div>
            <div className={styles.itemInfo}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{(totalPrice*0.05).toFixed(2)} руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={(onClickOrder)} className={`${styles.greenButton} ${"greenButton"}`}>
                {" "}
                Оформить заказ
                <img width={14} height={12} src="img/arrow.svg" />
              </button>
            </div>
          </div>
        ) : (
          <Info 
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"} 
            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ." }
            image={isOrderComplete ? "img/complete-order.jpg" : "img/cart-empty.jpg" }/>
        )}
      </div>
    </div>
  );
}

export default Drawer;