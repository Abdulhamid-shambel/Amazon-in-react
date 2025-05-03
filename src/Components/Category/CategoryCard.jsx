import React from 'react'
import classes from "./category.module.css"
import { Link } from 'react-router-dom';

function CategoryCard({data}) {
  // console.log(data);
  
  return (
    <section>
      <div className={classes.category}>
        <Link to={`/category/${data.name}`}>
          <span>
            <h2>{data.title} </h2>
          </span>
          <img src={data.imgLink} alt="" />
          <p>shop now</p>
        </Link>
      </div>
    </section>
  );
}

export default CategoryCard