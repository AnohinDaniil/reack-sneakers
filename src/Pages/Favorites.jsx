import React from "react";
import { Link } from "react-router-dom";

import Card from "../components/Card"
import AppContext from "../context";
import Info from "../components/Info";

function Favorites(){

    const {items, favorites, onAddToCart, onAddToFavorite} = React.useContext(AppContext);
    return(
        <div className="content">
          <div className="pageTitle">
            <Link className="linkStyle" to="reack-sneakers/">
              <img width={35} height={35} src="img/back-to-Home.svg"/>
            </Link>
            <h1>
              {"Мои закладки"}
            </h1>
          </div>
          { favorites.length > 0 ? ( 
            <div className="sneakers">
              {favorites.map((item) => (
                <Card
                  key={items.id}
                  onFavorite={(obj) => onAddToFavorite(obj)}
                  onPlus={(obj) => onAddToCart(obj)}
                  {...item}
                />
              ))}
            </div>
            ) : (
            <Info 
              title={"Закладок нет :("} 
              description={"Вы ничего не добавляли в закладки" }
              image={"img/favorits-empty.jpg" }
              linkTo={true}/>
            )
          }
      </div>
    );
}

export default Favorites;