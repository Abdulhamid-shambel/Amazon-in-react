import React, { useContext, useState } from "react";
import classes from "./payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";

function Payment() {
  const [{ user, basket }] = useContext(DataContext);

  const totalItem = basket.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    e?.error?.message? setCardError(e.error.message) : setCardError(null);
  }
  return (
    <LayOut>
      {/* header */}
      <div className={classes.pament_header}>Checkout ({totalItem}) items</div>

      {/* payment method */}

      <section className={classes.payment}>
        {/* Adress */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Los Angeles, CA</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket.map((item) => {
              return <ProductCard product={item} flex={true} />;
            })}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_card_container}>
            <div>
              <form action="">
                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* card number error message */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                {/* price */}
                <div className={classes.payment_price_container}>
                  <div>
                    <span>
                      <p>Total order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button>Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
