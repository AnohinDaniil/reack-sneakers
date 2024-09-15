import React from "react"
import Card from "../components/Card"
import AppContext from "../context"

function Home({searchCard, setSearchCard, onChangeSearchInput, isLoading}){
  
  const {items, onAddToCart, onAddToFavorite} = React.useContext(AppContext)

    const renderItems = () => {
      const filtredItems = items
      .filter((obj) =>
        obj.title.toLowerCase().includes(searchCard.toLowerCase())
      )

      return ( isLoading ? [...Array(8)] : filtredItems).map((item) => (
        <Card
          key={items.id}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          loading={isLoading}
          {...item}
        />
      ))
      
    }

    return(
        <div className="content">
        <div className="contentSearch">
          <h1>
            {searchCard ? `Поиск по запросу: "${searchCard}"` : "Все кроссовки"}
          </h1>
          <div className="searchBlock">
            <img src="img/search.svg" alt="Search" />
            <input
              onChange={onChangeSearchInput}
              value={searchCard}
              placeholder="Поиск..."
            />
            {searchCard && (
              <img
                onClick={() => setSearchCard("")}
                className="clear"
                width={20}
                height={20}
                src="img/btn-remove.svg"
                alt="Clear"
              />
            )}
          </div>
        </div>
        <div className="sneakers">
          {renderItems()}
        </div>
      </div>

    );
}

export default Home;