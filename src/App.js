import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import AppContext from "./context";
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";
import Orders from "./Pages/Orders";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchCard, setSearchCard] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {

        const [itemResponse, favoritesResponse, cartResponse] = await Promise.all([
          axios.get("https://12ea0c69c119ca4c.mokky.dev/items"), 
          axios.get("https://12ea0c69c119ca4c.mokky.dev/favorite"), 
          axios.get("https://12ea0c69c119ca4c.mokky.dev/cart")
        ])

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemResponse.data);
      } catch (error) {
        alert("Ошибка при загрузке данных :(");
      }
    }

    fetchData();
  }, []);

  const onRemoveItem = async (id) => {
    try {
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
      await axios.delete(`https://12ea0c69c119ca4c.mokky.dev/cart/${id}`);
    } catch (error) {
      alert("Не удалось удалить товар из корзины");
    }
  };

  const onRemoveFavorite = async (id) => {
    try {
      setFavorites((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
      await axios.delete(`https://12ea0c69c119ca4c.mokky.dev/favorite/${id}`);
    } catch (error) {
      alert("Не удалось удалить товар из закладок");
    }
  };

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) == Number(obj.id));
      if (findItem) {
        await onRemoveItem(findItem.id);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://12ea0c69c119ca4c.mokky.dev/cart",
          obj
        );
        setCartItems((prev) => prev.map(item => {
          if(item.parentId == data.parentId)
          {
            return {...item, id: data.id}
          }
          return item;
        }));
      }
    } catch (error) {
      alert("Не удалось добавить товар в корзину");
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      const findItem = favorites.find((item) => Number(item.parentId) == Number(obj.id))
      if (findItem) {
        await onRemoveFavorite(findItem.id);
      } else {
        setFavorites((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://12ea0c69c119ca4c.mokky.dev/favorite",
          obj
        );
        setFavorites((prev) => prev.map(item => {
          if(item.parentId == data.parentId)
          {
            return {...item, id: data.id}
          }
          return item;
        }));
      }
    } catch (error) {
      alert("Не удалось добавить товар в закладки");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchCard(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((item) => Number(item.parentId) == Number(id));
    //console.log(Number(id));
  };

  const isItemFavorite = (id) => {
    console.log(Number(id));
    items.map((obj) => obj.parentId)
    return favorites.some((item) => Number(item.parentId) == Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        onAddToCart,
        onAddToFavorite,
        isItemAdded,
        isItemFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper">
        <Drawer
          cartOpened={cartOpened}
          onRemove={onRemoveItem}
          onClose={() => setCartOpened(false)}
        />
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path=""
            element={
              <Home
                searchCard={searchCard}
                setSearchCard={setSearchCard}
                onChangeSearchInput={onChangeSearchInput}
                isLoading={isLoading}
              />
            }
          />
          <Route path="favorites" element={<Favorites />} />

          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
