import React from "react";
import classes from "./category.module.css";
import { categoryInfos } from "./categoryFullInfos";
import CategoryCard from "./CategoryCard";

function Category() {
  return (
    <section className={classes.Category_container}>
      {categoryInfos.map((infos) => {
        return <CategoryCard data={infos} />;
      })}
    </section>
  );
}

export default Category;
