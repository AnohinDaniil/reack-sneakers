import { Link } from "react-router-dom";
import React from "react";
import { useCart } from "../hooks/useCart";

function Header(props) {

  const {totalPrice} = useCart();

  return (
    <header>
      <Link className="linkStyle" to="">
        <div className="headerLeft">
          <img width={40} height={40} src="/img/logo.png" alt="Logo" />
          <div>
            <h3>React sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="headerRight">
        <li onClick={props.onClickCart}>
          <img width={18} height={17} src="img/telega.svg" alt="Telega" />
          <b>{totalPrice} руб.</b>
        </li>
        <Link className="linkStyle" to="favorites">
          <li>
            <img
              width={18}
              height={16}
              src="img/favorits.svg"
              alt="Favorits"
            />
            <span>Закладки</span>
          </li>
        </Link>
        <Link className="linkStyle" to="orders">
          <li>
            <img width={18} height={18} src="img/profile.svg" alt="Profile" />
            <span>Профиль</span>
          </li>
        </Link>
      </ul>
    </header>
  );
}

export default Header;
