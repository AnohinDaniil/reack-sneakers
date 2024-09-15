import React from "react";
import style from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

function Card({
  image,
  price,
  title,
  parentId,
  id,
  onFavorite,
  onPlus,
  loading = false,
}) {
  
  const {isItemAdded, isItemFavorite} = React.useContext(AppContext);

  const obj = {id, parentId: id, title, image, price}

  const onAddItem = () => {
    onPlus(obj);
  };

  const onFavoriteItem = () => {
    onFavorite(obj);
  };

  return (
    <div className={style.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={230}
          viewBox="0 0 150 230"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="147" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="0" rx="10" ry="10" width="150" height="125" />
          <rect x="0" y="166" rx="5" ry="5" width="93" height="15" />
          <rect x="0" y="203" rx="8" ry="8" width="80" height="24" />
          <rect x="118" y="198" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={style.favorite}>
            { onFavorite && (
              <img
                width={32}
                height={32}
                src={isItemFavorite(id) ? "img/heart-like.svg" : "img/heart-unlike.svg"}
                alt="Heart-unlike"
                onClick={onFavoriteItem}
              />)
            }
          </div>
          <img width="100%" height={135} src={image} alt="Sneakers" />
          <h5>{title}</h5>
          <div className={style.cardInfo}>
            <div className={style.cardPrice}>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {
              onPlus && (
              <img
                width={32}
                height={32}
                className={style.cardPlus}
                src={isItemAdded(id, parentId) ? "img/btn-check.svg" : "img/btn-plus.svg"}
                alt="Plus"
                onClick={onAddItem}
            />)
            }
            
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
