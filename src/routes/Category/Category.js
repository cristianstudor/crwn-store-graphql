import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import ProductCard from "../../components/ProductCard/ProductCard";
import Spinner from "../../components/Spinner/Spinner";

import "./Category.scss";

const GET_CATEGORY = gql`
  query ($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const Category = () => {
  const { category } = useParams();

  const { loading, data } = useQuery(GET_CATEGORY, {
    variables: {
      title: category
    }
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) {
      const {
        getCollectionsByTitle: { items }
      } = data;
      setProducts(items);
    }
  }, [category, data]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h2 className="category-title">{category.toUpperCase()}</h2>
          <div className="category-container">
            {products &&
              products.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Category;
