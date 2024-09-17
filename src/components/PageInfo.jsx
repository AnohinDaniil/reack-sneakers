import React from "react";
import AppContext from "../context";
import { Link } from "react-router-dom";

function PageInfo({ title, description, image }) {
  const { setCartOpened } = React.useContext(AppContext);
  return (
    <div className="statusFavorOrOrder">
      <div className="statusInfo">
        <img width={70} height={70} src={image} />
        <b>{title}</b>
        <p>{description}</p>
      </div>
      <Link className="linkStyle" to="/reack-sneakers/">
        <button onClick={() => setCartOpened(false)} className="greenButton">
          <img width={14} height={12} src="img/arrow-back.svg" />
          Вернуться назад
        </button>
      </Link>
    </div>
  );
}

export default PageInfo;
