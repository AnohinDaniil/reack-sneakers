import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Card from "../components/Card";
import PageInfo from "../components/PageInfo";

function Orders() {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://12ea0c69c119ca4c.mokky.dev/orders"
        );
        setOrders(data);
      } catch (error) {
        alert("Ошибка при запросе заказов!");
      }
    })();
  }, []);

  return (
    <div className="content">
      <div className="pageTitle">
        <Link className="linkStyle" to="/reack-sneakers/">
          <img width={35} height={35} src="img/back-to-Home.svg" />
        </Link>
        <h1>{"Мои покупки"}</h1>
      </div>
      {orders.length > 0 ? (
        <div className="sneakers">
          {orders.map((obj) => (
            <div className="orders">
              <h2>Заказ #{obj.id}</h2>
              <div className="sneakers">
                {obj.items.map((item) => (
                  <Card key={item.id} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <PageInfo
          title={"У вас нет заказов"}
          description={`Вы нищеброд? 
            Оформите хотя бы один заказ.`}
          image={"img/orders-empty.jpg"}
        />
      )}
    </div>
  );
}

export default Orders;
