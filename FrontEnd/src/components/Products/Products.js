import { Fragment, useEffect, useState } from "react";
import classes from "./Products.module.css";
import ProductsNavBar from "./ProductsNavbar";
import { useLoaderData, useParams, useSearchParams } from "react-router-dom";
import ProductsItem from "./ProductItem";
function Products() {
  // state lưu danh sách sản phẩm đã lọc
  const [productsList, setProductsList] = useState([]);
  // lấy params từ URL
  const [searchParams] = useSearchParams();
  // lấy category ngừoi dùng muốn vào danh mục sản phẩm nào
  const category = searchParams.get("category");
  // danh sách sản phẩm đã láy từ api
  const productsListLoader = useLoaderData();
  // sử dụng useEffect để lọc danh sách sản phẩm khi params bị thay đổi
  useEffect(() => {
    // nếu danh mục là all, thì setProductsList là tất cả sản phẩm

    if (category === "all") {
      setProductsList(productsListLoader);
    } else {
      // còn không thì loc danh sách sản phẩm và set vaò ProductsList
      setProductsList(
        productsListLoader.filter((product) => product.category === category)
      );
    }
  }, [category]);

  return (
    <Fragment>
      <div className=" bg-body-tertiary d-flex p-5 justify-content-between align-items-center">
        <div className=" py-5 px-4 ">
          <h5 className="fs-1">SHOP </h5>
        </div>
        <div className=" py-5 px-4">
          <p className="text-secondary">SHOP</p>
        </div>
      </div>

      <div className={classes.products}>
        <div>
          <h4 className="fw-medium fs-4">CATEGORIES</h4>
          <ProductsNavBar />
        </div>

        <div>
          <div className="d-flex justify-content-between">
            <input
              className={classes.search}
              placeholder="Enter Search Here!"
            ></input>
            <select className={`form-select ${classes.select}`}>
              <option>Default Sorting</option>
              <option>Price</option>
              <option>Product</option>
            </select>
          </div>
          <div className={`mt-4 ${classes["products_list"]}`}>
            {productsList.map((product) => (
              <ProductsItem key={product._id} product={product} />
            ))}
            {productsList.length === 0 && <p>No Product</p>}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Products;
