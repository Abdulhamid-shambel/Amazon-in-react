import React, { useContext, useEffect, useState } from "react";
import classes from "./orders.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard"

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          setOrders(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          })));
        });
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>

          {
            orders?.length === 0 && (
              <div className={classes.no_orders}>
                <h3>No Orders Found</h3>
                <p>Looks like you haven't placed any orders yet.</p>
              </div>
            )
          }

          {/* ordered items */}
          <div>
            {
              orders?.map((eachOrder, i) => {
                return (
                  <div key={i} className={classes}>
                    <hr />
                    <p>Order ID: {eachOrder?.id} </p>
                    {
                      eachOrder?.data?.basket?.map(order => {
                        return <ProductCard
                          key={order.id}
                          product={order}
                          flex={true}
                          className={classes.order_card}
                        />
                      })  
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
