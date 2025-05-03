import React, { useEffect, useState } from "react";
import classes from "./result.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";

function Result() {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  useEffect(() => {
    axios
      .get(`${productUrl}products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <LayOut>
      <div>
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
                />
              );
            })}
          </div>
        </section>
      </div>
    </LayOut>
  );
}

export default Result;
