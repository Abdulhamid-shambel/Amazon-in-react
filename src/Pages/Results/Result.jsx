import React, { useEffect, useState } from "react";
import classes from "./result.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

function Result() {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <LayOut>
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <section>
            <h1 style={{ padding: "30px" }}>Results</h1>
            <p style={{ padding: "30px" }}>category / {categoryName}</p>
            <hr />
            <div className={classes.products_container}>
              {results.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    renderAdd={true}
                  />
                );
              })}
            </div>
          </section>
        )}
      </div>
    </LayOut>
  );
}

export default Result;
