import { useEffect, useState } from "react";
import { getProducts, totalProductsCount } from "../../../../../api/admin.api";
import style from "./ListProduct.module.css";
import { Pagination } from "@mui/material";
import { ProductDashboardCard } from "../../../../../components";

const ListProduct = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);

  const getLimitedProducts = async (page) => {
    const response = await getProducts(page);
    if (response.statusCode === 200) {
      setProducts(response.data.products);
    }
  };

  const countProducts = async () => {
    const response = await totalProductsCount();
    setProductsCount(response.data);
  };

  useEffect(() => {
    getLimitedProducts(page);
  }, [page]);

  useEffect(() => {
    countProducts();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.sectionTitle}>
        <div className={style.sectionTitleText}>Product</div>
        <div className={style.sectionTitleText} style={{ margin: "0 5px" }}>
          SKUID
        </div>
        <div className={style.sectionTitleText}>Brand</div>
        <div className={style.sectionTitleText}>Price</div>
      </div>
      {products.map((product, index) => {
        return (
          <div key={index}>
            <ProductDashboardCard data={product} page={page} />
          </div>
        );
      })}
      <div className={style.pagination}>
        <Pagination
          count={Math.ceil(productsCount / 10)}
          page={page}
          onChange={(value) => setPage(value)}
        />
      </div>
    </div>
  );
};

export default ListProduct;
