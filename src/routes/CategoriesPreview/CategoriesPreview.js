import { useContext, Fragment } from "react";

import { CategoriesContext } from "../../contexts/CategoriesContext";

import CategoryPreview from "../../components/CategoryPreview/CategoryPreview";
import Spinner from "../../components/Spinner/Spinner";

const CategoriesPreview = () => {
  const { categoriesMap, loading } = useContext(CategoriesContext);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];

          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
