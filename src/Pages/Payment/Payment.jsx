import React, { useContext, useState } from "react";
import classes from "./payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../../utility/firebase";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [{ user, basket }] = useContext(DataContext);

  const totalItem = basket.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {

    // console.log(e);

    e?.error?.message? setCardError(e.error.message) : setCardError(null);
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setIsProcessing(true);

      // 1, backend || functions -----> contact to the client secret
      
      const response = await axiosInstance({
        method: "post",
        url: `/payment/create?total=${total * 100}`
      });

      // console.log(response.data);

      const clientSecret = response.data.clientSecret;

      // 2, client side (react side confirmation)

      const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      // console.log(paymentIntent);


      // 3, after the confirmation ---> order firestore database save & clear basket

      await db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        });

      setIsProcessing(false);

      navigate("/orders", {state: {message: "Your order has been placed successfully"}});


    } catch (error) {
      console.log(error)
      setIsProcessing(false);
    }
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
              <form onSubmit={handlePayment}>
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
                  <button type="submit">
                    {isProcessing ? (
                      <div className={classes.loading}>

                        <ClipLoader
                          color="gray"
                          size={12}
                          cssOverride={{ marginLeft: "10px" }}
                        />
                        <p>Please wait ....</p>
                      </div>
                      
                    ) : (
                      "Pay Now"
                    )
                    }
                  </button>
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
