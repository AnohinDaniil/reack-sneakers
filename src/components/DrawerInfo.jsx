import React from "react";
import AppContext from "../context";

function DrawerInfo({ title, description, image, setIsOrderComplete }) {
  const { setCartOpened } = React.useContext(AppContext);

  const closeDrawer = () => {
    setCartOpened(false);
    setIsOrderComplete(false);
  };

  return (
    <div className="statusCart">
      <div className="statusInfo">
        <img width={120} src={image} />
        <b>{title}</b>
        <p>{description}</p>
      </div>
      <button onClick={() => closeDrawer()} className="greenButton">
        <img width={14} height={12} src="img/arrow-back.svg" />
        Вернуться назад
      </button>
    </div>
  );
}

export default DrawerInfo;
